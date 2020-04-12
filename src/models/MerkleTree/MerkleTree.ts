// import { Log, MerkleTreeNode, MerkleTreeLeafNode } from '@models';

// export class MerkleTree {
//     topHash?: Node
//     leafNodes: [ MerkleTreeLeafNode, MerkleTreeLeafNode ][] = [];
//     leafNodeBuffer?: MerkleTreeLeafNode;
//     datablockLength: Number = 1000;

//     constructor(datablockLength?: Number) {
//     }

//     public addLeafNode(datablock: Log): void {
//         // if there is no other leafnode to pair with then store this for later
//         if (!this.leafNodeBuffer) {
//             this.leafNodeBuffer = new MerkleTreeLeafNode(datablock);
//             return;
//         }
        
//         // if another leaf node already exist then go and make a branch
//         this.leafNodes.push([ this.leafNodeBuffer, new MerkleTreeLeafNode(datablock)]);

//         // find some way to recursivly build the merkle tree as the nodes are added to the datablocks
//     }

//     public getStrippedMerkleTree(): MerkleTreeNode | void {
//         // strip all the data from the leaf nodes bascially by returning array of array of array of hashes
//         // basically do this by simply deleting the datablocks from the MerkleTreeLeafNodes
//     }

// }