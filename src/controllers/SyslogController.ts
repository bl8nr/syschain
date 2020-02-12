import { Elasticsearch, Ethereum, logger} from '@utilities';
import { sha256 } from 'js-sha256';
const parse = require('syslog-parse');

export class SyslogController {
    logCounter: number;

    constructor(elasticsearch: Elasticsearch, ethereum: Ethereum) {
        this.logCounter = 0;
    }


    public addLog = (message: string, info: any) => {
        this.logCounter++;
        logger.changeStatus(`
            ${ logger.getYellowtext.bold("LOGS RECEIVED:") } ${logger.getBlueText(`${this.logCounter}`)}
            ${ logger.getYellowtext.bold("PENDING TX:")} ${logger.getBlueText(`${this.logCounter}`)}
            ${ logger.getYellowtext.bold("SUCCESSFUL TX:")} ${logger.getBlueText(`${this.logCounter}`)}
            ${ logger.getYellowtext.bold("UNSUCCESSFUL TX:")} ${logger.getBlueText(`0`)}
            ${ logger.getYellowtext.bold("BLOCKCHAIN") }
                ${ logger.getYellowtext.bold("BLOCK NUMBER")} ${logger.getBlueText(`2206939`)}
                ${ logger.getYellowtext.bold("LAST BLOCK Tx COUNT")} ${logger.getBlueText(`140`)}
                ${ logger.getYellowtext.bold("Tx POOL QUEUE COUNT")} ${logger.getBlueText(`140`)}
            ${ logger.getYellowtext.bold("BESU NODE") }
                ${ logger.getYellowtext.bold("TYPE:") } ${logger.getBlueText(`Web Socket`)}
                ${ logger.getYellowtext.bold("ENDPOINT_URI:") } ${logger.getBlueText(`http://127.0.0.1:8545`)}
                ${ logger.getYellowtext.bold("REQUEST_KWARGS:") } ${logger.getBlueText(`{'timeout': 60}`)}
            ${ logger.getYellowtext.bold("WORM") }
                ${ logger.getYellowtext.bold("STATUS:") } ${logger.getRedText.bold(`DISABLED`)}
        `)
        // console.log(message);
        // console.log(info);
        /*
        ${ logger.getYellowtext.bold("LAST TIMESTAMP:") } ${logger.getBlueText((new Date(parse(message).time)).toISOString())}
        ${ logger.getYellowtext.bold("HOSTNAME:") } ${logger.getBlueText(`${info.address}:${info.port}`)}
        ${ logger.getYellowtext.bold("PRIORITY:") } ${logger.getBlueText(`${parse(message).priority}`)}
        ${ logger.getYellowtext.bold("FACILITY:") } ${logger.getBlueText(`${parse(message).facilityCode}:${parse(message).facility}`)}
        ${ logger.getYellowtext.bold("SEVERITY:") } ${logger.getBlueText(`${parse(message).severityCode}:${parse(message).severity}`)}
        ${ logger.getYellowtext.bold("MESSAGE:") } ${logger.getBlueText(`${parse(message).message}`)}
        ${ logger.getYellowtext.bold("CHAIN STATUS:") } ${logger.getWhiteText.bgRed(`TX SENT - PENDING`)}*/
    }

    public initialize() {

    }

    public error() {

    }

}