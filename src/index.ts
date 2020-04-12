import './LoadEnv'; // Must be the first import
import { Listener, logger } from '@utilities';
import { SyslogController } from '@controllers';
import { Besu, Mongoose } from '@services';

let besu: Besu;
let mongoose: Mongoose;

if (process.env.PROVIDER_ADDRESS && process.env.MONGO_ADDRESS) {
    besu = new Besu(process.env.PROVIDER_ADDRESS);
    mongoose = new Mongoose(process.env.MONGO_ADDRESS);

    logger.logHeader(`Establishing connections to data sources...`);
    Promise.all([
        mongoose.init(),
        besu.init()
    ]).then(() => {
        const syslogController = new SyslogController(besu);

        const listener = new Listener(
            syslogController.initialize,
            syslogController.addLog,
            syslogController.error);

        listener.start();
        logger.logHeader(`Listening for incoming Syslogs...`);

        setInterval(() => {
            logger.renderDashboard(besu, mongoose, syslogController, listener);
        }, 1000)
    })

    // mongoose.init()
    //     .then(() => {
    //         logger.changeStatus(`Initializing connection to Besu`);
    //         return besu.init()
    //     })
    //     .then(() => {
    //         console.log('wefw')
    //     })

    // mongoose.init().then(() => {
    //     console.log('wefwef')
    // }).catch((error) => {
    //     console.log(error)
    // })

    // besu.init().then(() => {
    //     const syslogController = new SyslogController(besu);

    //     const listener = new Listener(
    //         syslogController.initialize,
    //         syslogController.addLog,
    //         syslogController.error);

    //     listener.start();
    //     logger.logHeader(`Listening for incoming Syslogs...`);

    //     setInterval(() => {
    //         logger.renderDashboard(besu, syslogController, listener);
    //     }, 1000)
    // })
}