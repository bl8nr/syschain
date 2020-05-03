const chalk = require('chalk');
const  ora = require('ora');
import { Besu, Mongoose } from '@services';
import { SyslogController } from '@controllers';
import { Listener } from '@utilities';

/**
 * NOTE: I didnt really bother to comment in this file since this
 * file is basically just a bunch of hacked together console log
 * gibberish. Bascially, this class pulls, on command, params 
 * from the Besu and Mongoose services as well as the SyslogController
 * and presents them on the console, while replacing old console chars.
 */

class Logger {
    currentMessage: String = "Loading";
    oraTerminalOutput: any;
    dashboardString: string = ``;
    dashboard: DashboardObejct = { }

    constructor() {
        this.logHeader("LogFile - Brett Bloethner - 0.0.1");
        this.oraTerminalOutput = ora(this.currentMessage);
        this.oraTerminalOutput = this.oraTerminalOutput.start();
    }

    changeStatus(message: String) {
        this.currentMessage = message;
        if (this.oraTerminalOutput) {
            this.oraTerminalOutput.text = this.currentMessage;
            this.oraTerminalOutput.start();
        }
    }

    // print out a bold log
    logHeader(message: String) {
        if (this.oraTerminalOutput) {
            this.oraTerminalOutput = this.oraTerminalOutput.clear();

            console.log(chalk.yellowBright.bold(message))

            this.oraTerminalOutput.text = this.currentMessage;
            this.oraTerminalOutput.start();
        } else {
            console.log(chalk.yellowBright.bold(message))
        }
    }

    // print out a bold log
    blueInfo(message: String) {
        if (this.oraTerminalOutput) {
            this.oraTerminalOutput = this.oraTerminalOutput.clear();

            console.log(chalk.blueBright(message))

            this.oraTerminalOutput.text = this.currentMessage;
            this.oraTerminalOutput.start();
        } else {
            console.log(chalk.blueBright(message))
        }
    }

    logSuccess(message: String) {
        this.oraTerminalOutput.succeed(chalk.greenBright(message));
        this.oraTerminalOutput.text = this.currentMessage;
        this.oraTerminalOutput.start();
    }

    logFailure(message: String) {
        this.oraTerminalOutput.fail(message);
        this.oraTerminalOutput.text = this.currentMessage;
        this.oraTerminalOutput.start();
    }

    getBlueText(message: string): string {
        return chalk.blueBright(message);
    }

    public getYellowtext = chalk.yellowBright;
    public getRedText = chalk.redBright;
    public getWhiteText = chalk.white;
    // getYellowText(message: string): string {
    //     return chalk.yellowBright;
    // }

    getMagentaText(message: string): string {
        return chalk.magentaBright(message);
    }

    getCyanText(message: string): string {
        return chalk.cyanBright(message);
    }

    renderDashboard(besu: Besu, mongoose: Mongoose, syslogController: SyslogController, listener: Listener) {
        let dashboardString = ``;
        
        this.dashboard = {
            'log server': {
                'status': listener.status.toUpperCase(),
                'ip address' : `${listener.serverConfig.ipAddress}:${listener.serverConfig.port}`,
                'logs received': syslogController.received,
                'logs processed': syslogController.processed,
                'last received log': `${syslogController.lastReceivedLog?.time} (${syslogController.lastReceivedLog?.host}) ${syslogController.lastReceivedLog?.message}` 
            },
            'database': {
                'status': mongoose.readyState.toUpperCase(),
                'db name': mongoose.database,
                'address': mongoose.databaseName
            },
            'blockchain': {
                'chain id': besu.info ? besu.info.chainId : 'ERROR',
                'current block': besu.info ? besu.info.currentBlock : 'ERROR',
                'account address': besu.info ? besu.account.address : 'ERROR',
                'node info': besu.info ? besu.info.nodeInfo : 'ERROR',
                'last processed log': `${syslogController.lastLogProcessed?.time} (${syslogController.lastLogProcessed?.host}) ${syslogController.lastLogProcessed?.message}`,
                'last processed log status': `${syslogController.lastLogProcessed?.blockchain.verified ? 'VERIFIED' : 'VERIFICATION FAILED'} on ${syslogController.lastLogProcessed?.blockchain.varificationLastCheckedDateTime.toString()}`,
                'last processed log transaction address': `${syslogController.lastLogProcessed?.blockchain.transactionHash}` 
            }
        }

        Object.keys(this.dashboard).forEach((key) => {
            // add a section header
            if (typeof(this.dashboard[key]) !== 'object') {
               dashboardString += `\n \t \t ${ this.getYellowtext.bold(`${key.toUpperCase()}`)}: ${this.getBlueText(`${this.dashboard[key]}`)}`
            } else {
                dashboardString += `\n \t \t ${ this.getYellowtext.bold(key.toUpperCase()) }`
                
                Object.keys(this.dashboard[key]).forEach((k2) => {
                    dashboardString += `\n \t \t    ${ this.getYellowtext.bold(`${k2.toUpperCase()}`)}: ${this.getBlueText(`${this.dashboard[key][k2]}`)}`
                })
            }
        })

        this.changeStatus(dashboardString);
    }
}

export const logger = new Logger();

interface DashboardObejct {
    [key: string]: any
}
























class Loggefr {
    terminalLogItems: TerminalLogItem[] = [];
    static chalk = chalk;

    // print out a bold log
    logHeader(message: String) {
        console.log(chalk.yellowBright.bold(message))
    }

    currentStatus(message: String) {

    }

    logSuccess(message: String) {

    }

    logFailure(message: String) {

    }

    // being the print out of a progress log
    progressLog(message: String, status?: TerminalLogStatus) {
        const newLog = new TerminalLogItem(message);
        this.terminalLogItems.push(newLog);
        return newLog;
    }

    // succede current progress log

    // fail current progress log

    log(message: String) {

    }

    public blue(message: String) {
        return chalk.blue(message);
    }

    public yellow(message: String) {
        return chalk.yellowBright(message);
    }

    public green(message: String) {
        return chalk.green(message);
    }

    public outputArrayTree(array: any[], depth: 4) {
        // make is so that it actually outputs a tree to whatever depth level
        console.log(array);
    }

}


// export const logger = new Logger();

class TerminalLogItem {
    status: TerminalLogStatus;
    message: String;
    oraTerminalOutput: any;

    constructor(message: String, status: TerminalLogStatus = TerminalLogStatus.PENDING) {
        this.status = status;
        this.message = message;
        this.oraTerminalOutput = ora(this.message)
        this.markAsPending();
    }

    public markAsPending() {
        this.oraTerminalOutput.start();
    }

    public changeMessage(message: String) {
        this.oraTerminalOutput.text = message;
    }

    public complete(completionMessage?: String) {
        this.status = TerminalLogStatus.COMPLETED;
        this.message = completionMessage ? completionMessage : this.message;
        this.oraTerminalOutput.succeed(this.message);
    }

    public fail(failureMessage?: String) {
        this.status = TerminalLogStatus.FAILED;
        this.message = failureMessage ? failureMessage : this.message;
    }
}

enum TerminalLogStatus {
    PENDING,
    COMPLETED,
    FAILED
}