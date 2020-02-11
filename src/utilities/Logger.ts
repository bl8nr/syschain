const chalk = require('chalk');
const  ora = require('ora');

export class Logger {
    static chalk = chalk;

    static loaderLog(message: String) {
        const l = ora(message);
        l.start()
        return l;
    }

    static blue(message: String) {
        return chalk.blue(message);
    }

    static yellow(message: String) {
        return chalk.yellowBright(message);
    }

    static green(message: String) {
        return chalk.green(message);
    }

}