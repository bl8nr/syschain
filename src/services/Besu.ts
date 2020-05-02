import { logger } from '@utilities';
import { ILog } from '@interfaces';
import Web3 from "web3";
import * as Web3core from "web3-core";
import { sha256 } from 'js-sha256';

export class Besu {
    web3: Web3;
    eth: Web3["eth"];
    info: BesuInfo | undefined;
    account: Web3core.Account;
    accountNonce: number = 0;

    providerAddress: string;
    nodeInfo: string = '';
    chainId: number = 0;
    currentBlock: number = 0;

    constructor(providerAddress: string) {
        this.providerAddress = providerAddress;
        this.web3 = new Web3(`http://${this.providerAddress}`);
        this.eth = this.web3.eth;

        this.account = this.eth.accounts.wallet.add(this.web3.eth.accounts.create());
    }

    /**
     * init(): iniitialize the connection to besu as well as the besu status info
     */
    public async init() {
        await this.updateInfo();
        logger.logSuccess(`Connected to Besu at ${this.providerAddress}`);
    }

    /**
     * updateInfo(): updates the blockchain info params. These params are used
     * to display status and progress of the blockchain portion of tha app
     */
    private async updateInfo(): Promise<BesuInfo> {

        const besuInfo: BesuInfo = {
            nodeInfo: '',
            chainId: 234,
            currentBlock: 234
        };

        await this.eth.getNodeInfo().then((nodeInfo) => { besuInfo.nodeInfo = nodeInfo });
        await this.eth.getChainId().then((chainId) => { besuInfo.chainId = chainId });
        await this.eth.getBlockNumber().then((blockNumber) => { besuInfo.currentBlock = blockNumber });
        this.info = besuInfo;
        return this.info;
    }

    /**
     * sendLogAsTransaction(): takes the log object and creates a unique enthereum
     * transaction out of some of the data in the log. This function will return
     * a TransactionReceipt that provides us the new tranasctions unique address
     * @param log a log object that contains one syslog data sent to the app
     */
    public async sendLogAsTransaction(log: ILog): Promise<Web3core.TransactionReceipt> {
        
        // calulate the nonce so that its at least one count higher than all transactions from this apps address
        const nonce = this.accountNonce == 0 ? await this.web3.eth.getTransactionCount(this.account.address) : this.accountNonce;
        this.accountNonce++;

        // encode ths log digest hash, the data param of a transaction requires the data to be encoded to byte/ABI
        const encoded = this.web3.eth.abi.encodeParameter('string', log.blockchain.logDigestHash);

        // create the transaction object via the Web3 library
        const transactionObject: Web3core.TransactionConfig = {
            from: this.account.address,
            value:  "0",
            data: encoded,
            gas: 1129050,
            nonce: nonce
        };

        // update the local besu related info. Doing it here simply because it gets called often when besu changes
        await this.updateInfo();

        // send the transaction to the blockchain and return the Transaction Receipt promise
        return await this.web3.eth.sendTransaction(transactionObject) as Web3core.TransactionReceipt;
    }

    /**
     * verifyLog(): this method takes a log object and searches the immutable blockchain to determine
     * if the logs data is valid.
     * @param log a log object that contains one syslog data sent to the app
     */
    public async verifyLog(log: ILog): Promise<Boolean> {

        // recerate the log digest hash from the log data passed in
        const logDigestHash = sha256(`${log.time}${log.host}${log.message}`);

        // encode the log digest hash so its in the same format as it is in the transactions
        const encodedLogDigestHash = this.web3.eth.abi.encodeParameter('string', logDigestHash);
        
        // determine if the digest matches the digest in the immutable blockchain entry. return result
        const transaction = await this.web3.eth.getTransaction(log.blockchain.transactionHash);
        if (transaction.input == encodedLogDigestHash) {
            return true;
        } else {
            return false;
        }
    }

}

interface BesuInfo {
    nodeInfo: string,
    chainId: number,
    currentBlock: number
}










/**
 * Depreceated Code related to using contracts rather than transactions.
 * I ended up optin for transactions since it easier to impliment
 */

// import * as fs from 'fs';
// public async sendContract(): Promise<String> {
//     const bytecode = fs.readFileSync('src/contracts/helloworld_sol_SimpleStorage.bin').toString();
//     const abi = JSON.parse(fs.readFileSync('src/contracts/helloworld_sol_SimpleStorage.abi').toString());

//     const contract = new this.web3.eth.Contract(abi);
//     const deplyedContract = await contract.deploy({data: '0x' + bytecode});

//     const receiptContract = await deplyedContract.send({
//         from: this.account.address,
//         gas: 1129050
//     });

//     return receiptContract.options.address;
// }