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
        chainId: Number;
        blockHash: String;
        blockNumber: Number;
        from: String;
        transactionHash: string;
        logDigestHash: string;
        verified: Boolean;
        varificationLastCheckedDateTime: Date;
    }
}