import { MerkleTreeLeafNode } from '@models';
import { sha256 } from 'js-sha256';

export class MerkleTreeNode {
    hash: String
    children: [ MerkleTreeNode, MerkleTreeNode ] | [ MerkleTreeLeafNode, MerkleTreeLeafNode ]

    constructor(children: [ MerkleTreeNode, MerkleTreeNode ] | [ MerkleTreeLeafNode, MerkleTreeLeafNode ]) {
        this.hash = sha256(`${children[0].hash}${children[1].hash}`);
        this.children = children;
    }
}