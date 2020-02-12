const dgram = require('dgram');
import { logger, TerminalLog } from '@utilities';


export class Listener {
    onListeningCallback: Function;
    onMessageCallback: Function;
    onErrorCallback: Function;
    server: any;

    constructor(onListeningCallback: Function, onMessageCallback: Function, onErrorCallback: Function) {
        this.onListeningCallback = onListeningCallback;
        this.onMessageCallback = onMessageCallback;
        this.onErrorCallback = () => { onErrorCallback() };

        // if the application is configured to use UPD...
        if(process.env.LISTEN_PROTOCOL === 'udp') {
            logger.logHeader(`Initialzing UDP listening server...`);
            
            this.createServer();
            this.startOnListenEvents();
            this.startOnMessageEvents();
            this.startOnErrorEvents();
        } else {
            // ...else throw an error that the configuration is in correct
            //console.log("Unknown protocol. Protocol must be udp");
        }

    }

    @TerminalLog(`Creating UDP server`)
    private createServer() {
        this.server = dgram.createSocket('udp4');
    }

    @TerminalLog(`Creating onListening event listeners`)
    private startOnListenEvents() {
        this.server.on('listening', () => {
            const address = this.server.address();
            this.onListeningCallback();
            logger.changeStatus(`Listening for incoming Syslogs...`)
        });
    }

    @TerminalLog(`Creating onMessage event listeners`)
    private startOnMessageEvents() {
        this.server.on('error', (err: any) => {
            //console.log(`server error:\n${err.stack}`);
            this.onErrorCallback();
            this.server.close();
        });
    }

    @TerminalLog(`Creating onError event listeners`)
    private startOnErrorEvents() {
        this.server.on('message', (message: any, info: any) => {
            this.onMessageCallback(message.toString('utf-8'), info);
            //logger.changeStatus(`Listening for incoming Syslogs...`)
            //console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
            // console.log(sha256(`${msg}`))
        });
    }

    @TerminalLog(`Binding server to ${process.env.LISTEN_ON_ADDRESS}:${process.env.LISTEN_ON_PORT}`)
    public start() { this.bindListener(); }
    private bindListener() {
        this.server.bind(process.env.LISTEN_ON_PORT);
    }

}