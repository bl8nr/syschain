import mongoose, { Schema, Document } from 'mongoose';

const LogSchema: Schema = new Schema({
    priority: { type: Number, required: true, unique: false },
    facilityCode: { type: Number, required: true, unique: false },
    facility: { type: String, required: true, unique: false },
    severityCode: { type: Number, required: true, unique: false},
    severity: { type: String, required: true, unique: false },
    time: { type: Date, required: true, unique: false },
    host: { type: String, required: true, unique: false },
    process: { type: String, required: true, unique: false },
    message: { type: String, required: true, unique: false },
    blockchain: {
        chain_id: { type: Number, required: true, unique: false },
        block_id: { type: Number, required: true, unique: false },
        author_account_address: { type: String, required: true, unique: false }
    }
});

export default mongoose.model<ILog>('Log', LogSchema);

export interface ILog extends Document {
    priority: Number;
    facilityCode: Number;
    facility: String;
    severityCode: Number;
    severity: String;
    time: Date;
    host: String;
    process: String;
    message: String;
    blockchain: {
        chain_id: Number;
        block_id: Number;
        author_account_address: String;
    }
}

// import { sha256 } from 'js-sha256';

// export class Log {

//     message: String;
//     timestamp: Date;


//     constructor(message: String, timestamp: Date) {
//         this.message = message;
//         this.timestamp = timestamp;
//     }

//     // get a hash representing the data in the log that we want to be immutable
//     public getHash() {
//         return sha256(`${this.message}${this.timestamp}`);
//     }

//     public submitLogTransaction() {
//         // nothing
//     }

// }