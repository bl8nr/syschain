import { logger } from '@utilities';
import mongoose, { Connection } from 'mongoose';

export class Mongoose {
    private db: Connection | undefined;
    connectionString: string;
    readyState: any;
    database: any;
    databaseName: any;

    constructor(connectionString: string) {
        this.connectionString = connectionString;
    }

    /**
     * init(): create and establish the connection to the Mongo database specified in the .env file
     */
    async init() {

        // create the connection and start listening for status changes to log out for convineince
        this.db = mongoose.connection;
        this.initReadyStateListeners(this.db);

        // establish the connection to the Mongo database and set the relevant local params accordingly
        await mongoose.connect(`${this.connectionString}`, {useNewUrlParser: true, useUnifiedTopology: true});
        this.database = this.db.db.databaseName
        this.databaseName = `${this.db.host}:${this.db.port}`;

        // log success
        logger.logSuccess(`Connected to MongoDB at ${this.databaseName}`);
    }

    /**
     * initReadyStateListeners(): initialize listeners that will report the statuds of the
     * atabase connection, this will get displayed to the console
     * @param db A Mongoose database conenction object
     */
    initReadyStateListeners(db: Connection) {
        db.on('connected', () => { this.readyState = 'connected' });
        db.on('connecting', () => { this.readyState = 'connecting' });
        db.on('disconnecting', () => { this.readyState = 'disconnecting' });
        db.on('disconnected', () => { this.readyState = 'disconnected' });
    }

}