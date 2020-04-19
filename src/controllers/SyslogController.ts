const parse = require('syslog-parse');
import { Besu } from '@services';
import { ILog } from '@interfaces';
import { Log } from '@models';

export class SyslogController {
    received: number;
    lastLogRecevied: string;
    besu: Besu;

    constructor(besu: Besu) {
        this.received = 0;
        this.lastLogRecevied = 'null'
        this.besu = besu;
    }

    /**
     * addLog
     * @param message
     * @param info 
     * @returns
     */
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
    }

    public initialize() {

    }

    public error() {

    }

}