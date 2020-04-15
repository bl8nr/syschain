import { logger } from '@utilities';
import { sha256 } from 'js-sha256';
const parse = require('syslog-parse');
import { Besu } from '@services';
import Log, { ILog } from '../models/Log';

export class SyslogController {
    received: number;
    lastLogRecevied: string;
    besu: Besu;

    constructor(besu: Besu) {
        this.received = 0;
        this.lastLogRecevied = 'null'
        this.besu = besu;
    }


    public addLog = (message: string, info: any) => {
        if(!this.besu.info) {
            throw('Fatal Error: Failed to retreieve Besu info. Check Blockchain status.');
        }

        this.received++;
        this.lastLogRecevied = message;
        this.besu.sendTransaction();

        const parsedSyslog = parse(message);

        const log: ILog = new Log({
            priority: parsedSyslog.priority,
            facilityCode: parsedSyslog.facilityCode,
            facility: parsedSyslog.facility,
            severityCode: parsedSyslog.severityCode,
            severity: parsedSyslog.severity,
            time: parsedSyslog.time,
            host: parsedSyslog.host,
            process: parsedSyslog.process,
            message: parsedSyslog.message,
            blockchain: {
                chain_id: this.besu.info.chainId,
                block_id: this.besu.info.currentBlock,
                author_account_address: this.besu.account.address
            }
        });

        // hash and add to digest queue
        // calc the digest length, if it fits then write to a transaction in the block
        
        log.save();

        // console.log('log added');

        // logger.changeStatus(`
        //     ${ logger.getYellowtext.bold("LOGS RECEIVED:") } ${logger.getBlueText(`${this.logCounter}`)}
        //     ${ logger.getYellowtext.bold("PENDING TX:")} ${logger.getBlueText(`${this.logCounter}`)}
        //     ${ logger.getYellowtext.bold("SUCCESSFUL TX:")} ${logger.getBlueText(`${this.logCounter}`)}
        //     ${ logger.getYellowtext.bold("UNSUCCESSFUL TX:")} ${logger.getBlueText(`0`)}
        //     ${ logger.getYellowtext.bold("BLOCKCHAIN") }
        //         ${ logger.getYellowtext.bold("BLOCK NUMBER")} ${logger.getBlueText(`2206939`)}
        //         ${ logger.getYellowtext.bold("LAST BLOCK Tx COUNT")} ${logger.getBlueText(`140`)}
        //         ${ logger.getYellowtext.bold("Tx POOL QUEUE COUNT")} ${logger.getBlueText(`140`)}
        //     ${ logger.getYellowtext.bold("BESU NODE") }
        //         ${ logger.getYellowtext.bold("TYPE:") } ${logger.getBlueText(`Web Socket`)}
        //         ${ logger.getYellowtext.bold("ENDPOINT_URI:") } ${logger.getBlueText(`http://127.0.0.1:8545`)}
        //         ${ logger.getYellowtext.bold("REQUEST_KWARGS:") } ${logger.getBlueText(`{'timeout': 60}`)}
        //     ${ logger.getYellowtext.bold("WORM") }
        //         ${ logger.getYellowtext.bold("STATUS:") } ${logger.getRedText.bold(`DISABLED`)}
        // `)
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