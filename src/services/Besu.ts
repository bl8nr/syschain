import { logger } from '@utilities';
import Web3 from "web3";
import * as Web3core from "web3-core";

// const EEAClient = require("webs-eea");

export class Besu {
    web3: Web3;
    eth: Web3["eth"];
    info: BesuInfo | undefined;
    account: Web3core.Account;

    providerAddress: string;
    nodeInfo: string = '';
    chainId: number = 0;
    currentBlock: number = 0;

    constructor(providerAddress: string) {
        this.providerAddress = providerAddress;
        this.web3 = new Web3(`http://${this.providerAddress}`);
        this.eth = this.web3.eth;

        this.account = this.web3.eth.accounts.create();
    }

    public async init() {
        await this.updateInfo().then((newInfo: BesuInfo) => {
            this.info = newInfo;
            logger.logSuccess(`Connected to Besu at ${this.providerAddress}`);
        });
    }

    private async updateInfo(): Promise<BesuInfo> {

        const n: BesuInfo = {
            nodeInfo: '',
            chainId: 234,
            currentBlock: 234
        };

        await this.eth.getNodeInfo().then((a) => { n.nodeInfo = a });
        await this.eth.getChainId().then((b) => { n.chainId = b });
        await this.eth.getBlockNumber().then((c) => { n.currentBlock = c });
        return n;
    }

    public async sendTransaction() {
        const transactionConfig: Web3core.TransactionConfig = {
            from: this.account.address
        }
    }

}

// String.prototype.hexEncode = function(){
//     var hex, i;

//     var result = "";
//     for (i=0; i<this.length; i++) {
//         hex = this.charCodeAt(i).toString(16);
//         result += ("000"+hex).slice(-4);
//     }

//     return result
// }

interface BesuInfo {
    nodeInfo: string,
    chainId: number,
    currentBlock: number
}