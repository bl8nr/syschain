import { logger, TerminalLog } from '@utilities';
import mongoose, { Schema, Connection } from 'mongoose';


// const EEAClient = require("webs-eea");

export class Mongoose {
    private db: Connection | undefined;
    dbAddress: string;
    readyState: any;
    database: any;

    
    constructor(address: string) {
        this.dbAddress = address;
        // console.log("wefwef");
        // mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
        
        // this.db = mongoose.connection;
        // this.db.on('error', console.error.bind(console, 'connection error:'));
        // this.db.once('open', function() {
        //   // we're connected!
        //   console.log("wefwef");
        // });
        
        // const Cat = mongoose.model('Cat', { name: String });

        // const kitty = new Cat({ name: 'Zildjian' });
        // kitty.save().then(() => console.log('meow'));
    }

    //@TerminalLog(`Creating onListening event listeners`, `sdfsdf`)
    async init() {
        //logger.changeStatus(`Initializing connection to MongoDB`);
        this.db = mongoose.connection;
        this.initReadyStateListeners(this.db);

        await mongoose.connect(`mongodb://${this.dbAddress}/test`, {useNewUrlParser: true, useUnifiedTopology: true});
        this.database = this.db.db.databaseName
        logger.logSuccess(`Connected to MongoDB at ${this.db.host}:${this.db.port}`);
    }

    initReadyStateListeners(db: Connection) {
        db.on('connected', () => { this.readyState = 'connected' });
        db.on('connecting', () => { this.readyState = 'connecting' });
        db.on('disconnecting', () => { this.readyState = 'disconnecting' });
        db.on('disconnected', () => { this.readyState = 'disconnected' });
    }

}