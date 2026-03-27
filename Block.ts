import * as crypto from 'crypto';
import type { Transaction } from './Transaction.js';

export class Block<T> {
    public index: number;
    public timestamp: number;
    public data: T; 
    public previousHash: string;
    public hash: string;
    public nonce: number;
    public target: string;
    public merkleRoot: string;
    public lengthMax: number;
    public transactionsCount: number;
    public transactions: Transaction[]; // Substitua 'any' pela sua classe Transaction

    constructor(index: number, timestamp: number, data: T, previousHash: string) {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.target = "000000000000000000aaaa0000000000";
        this.nonce = 0;
        this.merkleRoot = '';
        this.lengthMax = 10;
        this.transactionsCount = 0;
        this.transactions = [];
    }

    calculateHash(): string {
        const str = this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.merkleRoot + this.nonce;
        return crypto.createHash('sha256').update(str).digest('hex');
    }

    mineBlock(difficulty: number): void {
        const targetBigInt = BigInt('0x' + this.target);
        while (BigInt('0x' + this.hash) >= targetBigInt) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log(`Bloco minerado! Hash: ${this.hash}, Nonce: ${this.nonce}`);
    }
}