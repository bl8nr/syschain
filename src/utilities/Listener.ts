const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const chalk = require('chalk');
import { Logger as log } from '@utilities';


export class Listener {
    onListeningCallback: Function;
    onMessageCallback: Function;
    onErrorCallback: Function;

    constructor(onListeningCallback: Function, onMessageCallback: Function, onErrorCallback: Function) {
        this.onListeningCallback = onListeningCallback;
        this.onMessageCallback = onMessageCallback;
        this.onErrorCallback = () => { onErrorCallback() };

        // if the application is configured to use UPD...
        if(process.env.LISTEN_PROTOCOL === 'udp') {
            // ...then start the UDP listening server
            console.log("Starting listening server on udp");
            this.startOnListenEvents();
        } else {
            // ...else throw an error that the configuration is in correct
            console.log("Unknown protocol. Protocol must be udp");
        }

    }

    private startOnListenEvents() {
        server.on('listening', () => {
            const address = server.address();
            console.log(chalk.bold.white(`server listening ${address.address}:${address.port}`));
            this.onListeningCallback();
        });
    }

    private startOnMessageEvents() {
        server.on('error', (err: any) => {
            console.log(`server error:\n${err.stack}`);
            this.onErrorCallback();
            server.close();
        });
    }

    private startOnErrorEvents() {
        server.on('message', (msg: any, rinfo: any) => {
            this.onMessageCallback();
            console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
            // console.log(sha256(`${msg}`))
        });
    }

    public start() { this.bindListener(); }
    private bindListener() {
        console.log(chalk.bold.white(`server starting on port ${process.env.LISTEN_ON_PORT}`));
        server.bind(process.env.LISTEN_ON_PORT)
    }

}