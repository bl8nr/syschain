import { Document } from 'mongoose';

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