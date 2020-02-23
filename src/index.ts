import './LoadEnv'; // Must be the first import
import { Listener, logger } from '@utilities';
import { SyslogController } from '@controllers';
import { Besu } from '@services';

let besu: Besu;

if (process.env.PROVIDER_ADDRESS) {
    besu = new Besu(process.env.PROVIDER_ADDRESS);
    besu.init().then(() => {
        const syslogController = new SyslogController(besu);
        console.log(besu.info);

        const listener = new Listener(
            syslogController.initialize,
            syslogController.addLog,
            syslogController.error);

        listener.start();
        logger.logHeader(`Listening for incoming Syslogs...`);

        setInterval(() => {
            logger.renderDashboard(besu, syslogController);
        }, 1000)
    })
}