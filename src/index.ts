import './LoadEnv'; // Must be the first import
import { Listener, Elasticsearch, Ethereum, logger } from '@utilities';
import { SyslogController } from '@controllers';

const chalk = require('chalk')

const syslogController = new SyslogController(
    new Elasticsearch(),
    new Ethereum()
);

const listener = new Listener(
    syslogController.initialize,
    syslogController.addLog,
    syslogController.error);

listener.start();
logger.logHeader(`Listening for incoming Syslogs...`);