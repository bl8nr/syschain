import { logger } from '@utilities';
import Web3 from "web3";
import * as Web3core from "web3-core";
import * as fs from 'fs';

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

        this.account = this.eth.accounts.wallet.add(this.web3.eth.accounts.create());
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


    public async sendContract() {
        const bytecode = fs.readFileSync('src/contracts/helloworld_sol_SimpleStorage.bin').toString();
        const abi = JSON.parse(fs.readFileSync('src/contracts/helloworld_sol_SimpleStorage.abi').toString());
        
        var block = this.web3.eth.getBlock("latest").then((block) => {
            console.log("gasLimit: " + block.gasLimit);
        });
        const contract = new this.web3.eth.Contract(abi);

        const f = contract.deploy({data: '0x' + bytecode});
        f.estimateGas().then((gas) => {
            console.log(gas);
        })

        f.send({
            from: this.account.address,
            gas: 1129050, 
        }).then((contract) => {
            console.log(contract);
        })
        // const contract = new this.web3.eth.Contract([
        //     {
        //         "constant": true,
        //         "inputs": [],
        //         "name": "GetHelloWorld",
        //         "outputs": [
        //             {
        //                 "name": "",
        //                 "type": "string"
        //             }
        //         ],
        //         "payable": false,
        //         "stateMutability": "view",
        //         "type": "function"
        //     }
        // ]);

        // const bytecode = JSON.stringify({
        //     "linkReferences": {},
        //     "object": "60806040526040805190810160405280600b81526020017f48656c6c6f20576f726c640000000000000000000000000000000000000000008152506000908051906020019061004f929190610062565b5034801561005c57600080fd5b50610107565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100a357805160ff19168380011785556100d1565b828001600101855582156100d1579182015b828111156100d05782518255916020019190600101906100b5565b5b5090506100de91906100e2565b5090565b61010491905b808211156101005760008160009055506001016100e8565b5090565b90565b6101a4806101166000396000f300608060405260043610610041576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063a1aa8ab114610046575b600080fd5b34801561005257600080fd5b5061005b6100d6565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561009b578082015181840152602081019050610080565b50505050905090810190601f1680156100c85780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b606060008054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561016e5780601f106101435761010080835404028352916020019161016e565b820191906000526020600020905b81548152906001019060200180831161015157829003601f168201915b50505050509050905600a165627a7a723058205ca1177131bad1d60c13a140434bff486e3ca35c8102a74895cf0e0be03ca6620029",
        //     "opcodes": "PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x40 DUP1 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 PUSH1 0xB DUP2 MSTORE PUSH1 0x20 ADD PUSH32 0x48656C6C6F20576F726C64000000000000000000000000000000000000000000 DUP2 MSTORE POP PUSH1 0x0 SWAP1 DUP1 MLOAD SWAP1 PUSH1 0x20 ADD SWAP1 PUSH2 0x4F SWAP3 SWAP2 SWAP1 PUSH2 0x62 JUMP JUMPDEST POP CALLVALUE DUP1 ISZERO PUSH2 0x5C JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x107 JUMP JUMPDEST DUP3 DUP1 SLOAD PUSH1 0x1 DUP2 PUSH1 0x1 AND ISZERO PUSH2 0x100 MUL SUB AND PUSH1 0x2 SWAP1 DIV SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 PUSH1 0x1F ADD PUSH1 0x20 SWAP1 DIV DUP2 ADD SWAP3 DUP3 PUSH1 0x1F LT PUSH2 0xA3 JUMPI DUP1 MLOAD PUSH1 0xFF NOT AND DUP4 DUP1 ADD OR DUP6 SSTORE PUSH2 0xD1 JUMP JUMPDEST DUP3 DUP1 ADD PUSH1 0x1 ADD DUP6 SSTORE DUP3 ISZERO PUSH2 0xD1 JUMPI SWAP2 DUP3 ADD JUMPDEST DUP3 DUP2 GT ISZERO PUSH2 0xD0 JUMPI DUP3 MLOAD DUP3 SSTORE SWAP2 PUSH1 0x20 ADD SWAP2 SWAP1 PUSH1 0x1 ADD SWAP1 PUSH2 0xB5 JUMP JUMPDEST JUMPDEST POP SWAP1 POP PUSH2 0xDE SWAP2 SWAP1 PUSH2 0xE2 JUMP JUMPDEST POP SWAP1 JUMP JUMPDEST PUSH2 0x104 SWAP2 SWAP1 JUMPDEST DUP1 DUP3 GT ISZERO PUSH2 0x100 JUMPI PUSH1 0x0 DUP2 PUSH1 0x0 SWAP1 SSTORE POP PUSH1 0x1 ADD PUSH2 0xE8 JUMP JUMPDEST POP SWAP1 JUMP JUMPDEST SWAP1 JUMP JUMPDEST PUSH2 0x1A4 DUP1 PUSH2 0x116 PUSH1 0x0 CODECOPY PUSH1 0x0 RETURN STOP PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x4 CALLDATASIZE LT PUSH2 0x41 JUMPI PUSH1 0x0 CALLDATALOAD PUSH29 0x100000000000000000000000000000000000000000000000000000000 SWAP1 DIV PUSH4 0xFFFFFFFF AND DUP1 PUSH4 0xA1AA8AB1 EQ PUSH2 0x46 JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x52 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x5B PUSH2 0xD6 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 DUP1 PUSH1 0x20 ADD DUP3 DUP2 SUB DUP3 MSTORE DUP4 DUP2 DUP2 MLOAD DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP DUP1 MLOAD SWAP1 PUSH1 0x20 ADD SWAP1 DUP1 DUP4 DUP4 PUSH1 0x0 JUMPDEST DUP4 DUP2 LT ISZERO PUSH2 0x9B JUMPI DUP1 DUP3 ADD MLOAD DUP2 DUP5 ADD MSTORE PUSH1 0x20 DUP2 ADD SWAP1 POP PUSH2 0x80 JUMP JUMPDEST POP POP POP POP SWAP1 POP SWAP1 DUP2 ADD SWAP1 PUSH1 0x1F AND DUP1 ISZERO PUSH2 0xC8 JUMPI DUP1 DUP3 SUB DUP1 MLOAD PUSH1 0x1 DUP4 PUSH1 0x20 SUB PUSH2 0x100 EXP SUB NOT AND DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP JUMPDEST POP SWAP3 POP POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH1 0x60 PUSH1 0x0 DUP1 SLOAD PUSH1 0x1 DUP2 PUSH1 0x1 AND ISZERO PUSH2 0x100 MUL SUB AND PUSH1 0x2 SWAP1 DIV DUP1 PUSH1 0x1F ADD PUSH1 0x20 DUP1 SWAP2 DIV MUL PUSH1 0x20 ADD PUSH1 0x40 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 SWAP3 SWAP2 SWAP1 DUP2 DUP2 MSTORE PUSH1 0x20 ADD DUP3 DUP1 SLOAD PUSH1 0x1 DUP2 PUSH1 0x1 AND ISZERO PUSH2 0x100 MUL SUB AND PUSH1 0x2 SWAP1 DIV DUP1 ISZERO PUSH2 0x16E JUMPI DUP1 PUSH1 0x1F LT PUSH2 0x143 JUMPI PUSH2 0x100 DUP1 DUP4 SLOAD DIV MUL DUP4 MSTORE SWAP2 PUSH1 0x20 ADD SWAP2 PUSH2 0x16E JUMP JUMPDEST DUP3 ADD SWAP2 SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 JUMPDEST DUP2 SLOAD DUP2 MSTORE SWAP1 PUSH1 0x1 ADD SWAP1 PUSH1 0x20 ADD DUP1 DUP4 GT PUSH2 0x151 JUMPI DUP3 SWAP1 SUB PUSH1 0x1F AND DUP3 ADD SWAP2 JUMPDEST POP POP POP POP POP SWAP1 POP SWAP1 JUMP STOP LOG1 PUSH6 0x627A7A723058 KECCAK256 0x5c LOG1 OR PUSH18 0x31BAD1D60C13A140434BFF486E3CA35C8102 0xa7 0x48 SWAP6 0xcf 0xe SIGNEXTEND 0xe0 EXTCODECOPY 0xa6 PUSH3 0x2900 ",
        //     "sourceMap": "25:174:0:-;;;51:44;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;25:174;8:9:-1;5:2;;;30:1;27;20:12;5:2;25:174:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;"
        // });

        // contract.deploy({data: bytecode}).send({
        //     from: this.account.address,
        //     gas: 1500000,
        //     gasPrice:this.web3.utils.toWei('0.00003', 'ether')
        // })


    }

    public async sendTransaction() {

        const transactionObject: Web3core.TransactionConfig = {
            from: this.account.address,
            to: this.account.address,
            value:  "1000000000000000000",
            data: "0xdf"
        };

        return this.web3.eth.sendTransaction(transactionObject);
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