const chalk = require('chalk');
const  ora = require('ora');
import { Besu } from '@services';
import { SyslogController } from '@controllers';

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

    renderDashboard(besu: Besu, syslogController: SyslogController) {
        let dashboardString = ``;
        
        this.dashboard = {
            logs_received: syslogController.received,
            besu: {
                chain_id: besu.info ? besu.info.chainId : 'ERROR',
                current_block: besu.info ? besu.info.currentBlock : 'ERROR',
                account_address: besu.info ? besu.account.address : 'EROR',
                node_info: besu.info ? besu.info.nodeInfo : 'ERROR',
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