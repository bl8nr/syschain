import './LoadEnv'; // Must be the first import
import app from '@server';
import { logger } from '@shared';
import { settings } from '@utilities';

const dgram = require('dgram');
const server = dgram.createSocket('udp4');
import { sha256, sha224 } from 'js-sha256';

const chalk = require('chalk')

server.on('error', (err: any) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', (msg: any, rinfo: any) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    console.log(sha256(`${msg}`))
});

server.on('listening', () => {
    const address = server.address();
    console.log(chalk.bold.white(`server listening ${address.address}:${address.port}`));
});

// echo ‘sourcehost message text’ | nc -v -u -w 0 0.0.0.0 514
server.bind(514);



// Start the server
// const port = Number(process.env.PORT || 3000);
// app.listen(port, () => {
//     logger.info('Express server started on port: ' + port);
// });

console.log("test")