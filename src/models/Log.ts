import { sha256 } from 'js-sha256';

export class Log {

    message: String;
    timestamp: Date;


    constructor(message: String, timestamp: Date) {
        this.message = message;
        this.timestamp = timestamp;
    }

    // get a hash representing the data in the log that we want to be immutable
    public getHash() {
        return sha256(`${this.message}${this.timestamp}`);
    }

    public submitLogTransaction() {
        // nothing
    }

}