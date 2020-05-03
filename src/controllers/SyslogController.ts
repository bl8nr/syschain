const parse = require('syslog-parse');
import { Besu } from '@services';
import { ILog } from '@interfaces';
import { Log } from '@models';
import { sha256 } from 'js-sha256';

export class SyslogController {
    received: number;
    processed: number;
    lastReceivedLog: ILog | undefined;
    lastLogProcessed: ILog | undefined;
    besu: Besu;

    constructor(besu: Besu) {
        this.received = 0;
        this.processed = 0;
        this.besu = besu;
    }

    /**
     * addLog(): this is tiggered once a log is recieved by the Listener (UDP Syslog server/reciever)
     * nothing is returned from this method since it runs as a result of a sort of 'listener' event so 
     * its basically asynchronous and out of the scope of the caller, in design
     * @param message standard syslog message in the form of a string
     */
    public addLog = async (message: string) => {

        // if there is no info in Besu...
        if(!this.besu.info) {
            // then we assume the Besu connection has failed and we return an error
            throw('Fatal Error: Failed to retreieve Besu info. Check Blockchain status.');
        }

        // parse the syslog and create a new Mongoose Log object from it
        const parsedSyslog = parse(message);
        let log: ILog = new Log({
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
                chainId: this.besu.info.chainId,
                from: this.besu.account.address,
                logDigestHash: sha256(`${parsedSyslog.time}${parsedSyslog.host}${parsedSyslog.message}`) // unique log entry digest/hash
            }
        });

        // increment the count of logs received and store this log as the last previous log
        this.received++;
        this.lastReceivedLog = log;

        // send the log as a transaction to besu (the blockchain)
        const transactionReceipt = await this.besu.sendLogAsTransaction(log);
 
        // fill in all the log.blockchain params with data from the blockchain transaction receipt
        log.blockchain.transactionHash = transactionReceipt.transactionHash;
        log.blockchain.blockNumber = transactionReceipt.blockNumber as number;
        log.blockchain.blockHash = transactionReceipt.blockHash as string;

        // verify the log about to be stored in mongoDB, with the transaction in the besu blockchain
        log.blockchain.verified = await this.besu.verifyLog(log);
        log.blockchain.varificationLastCheckedDateTime = new Date();

        // save the log in MongoDB
        log = await log.save();

        // increment the processed log count and update the lastProcessedLog (which is eventually displayed in the console)
        this.processed++;
        this.lastLogProcessed = log;
    }

    /**
     * initialize(): this method is fired once the server listener is initialized
     * its implimented but not being used, so its blank
     */
    public initialize() {
        // intentionally left blank
    }

    /**
     * error(): this method is fired once the server listener encounters an error
     * its implimented but not being used, so its blank
     */
    public error() {
        // intentionally left blank
    }

}