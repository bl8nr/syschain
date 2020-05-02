import mongoose, { Schema, Document } from 'mongoose';
import { ILog } from 'src/models/interfaces';

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
        chainId: { type: Number, required: true, unique: false },
        blockHash: { type: String, required: false, unique: false },
        blockNumber: { type: Number, required: false, unique: false},
        from: { type: String, required: false, unique: false },
        transactionHash: { type: String, required: false, unique: true, immutable: true },
        logDigestHash: { type: String, required: true, unique: true, immutable: true },
        verified: { type: Boolean, required: true, default: false },
        varificationLastCheckedDateTime: { type: Date, required: true, default: new Date }
    }
});

export default mongoose.model<ILog>('Log', LogSchema);