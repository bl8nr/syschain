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
        chain_id: { type: Number, required: true, unique: false },
        block_id: { type: Number, required: true, unique: false },
        author_account_address: { type: String, required: true, unique: false }
    }
});

export default mongoose.model<ILog>('Log', LogSchema);