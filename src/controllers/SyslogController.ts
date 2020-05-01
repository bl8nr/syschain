const parse = require('syslog-parse');
import { Besu } from '@services';
import { ILog } from '@interfaces';
import { Log } from '@models';

export class SyslogController {
    received: number;
    lastLogRecevied: ILog | undefined;
    besu: Besu;

    constructor(besu: Besu) {
        this.received = 0;
        this.besu = besu;
    }

    /**
     * addLog(): this is tiggered once a log is recieved by the Listener (UDP Syslog server/reciever)
     * @param message standard syslog message in the form of a string
     * @returns promise of the mongoose save that will resolve the newly saved Log
     */
    public addLog = (message: string) => {

        // if there is no info in Besu...
        if(!this.besu.info) {
            // then we assume the Besu connection has failed and we return an error
            throw('Fatal Error: Failed to retreieve Besu info. Check Blockchain status.');
        }

        // parse the syslog and create a new Mongoose Log object from it
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

         // increment the count of logs received and store this log as the last previous log
         this.received++;
         this.lastLogRecevied = log;

        // hash and add to digest queue
        // calc the digest length, if it fits then write to a transaction in the block
        //        this.besu.sendTransaction();

        // save the Log to MongoDB
        return log.save();
    }

    public initialize() {

    }

    public error() {

    }


    private writeBlockInformation() {
        // write to mongoDB
        // the current block number
        // the number of logs in the block
        // the address of the writer of the block
        // 
    }

}