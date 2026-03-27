import { Transaction } from './Transaction.js';

export class Mempool {
    private transactions: Transaction[] = [];

    add(transaction: Transaction): void {
        this.transactions.push(transaction);
    }

    getAll(): Transaction[] {
        return [...this.transactions];
    }

    clear(): void {
        this.transactions.length = 0;
    }

    size(): number {
        return this.transactions.length;
    }

    remove(transaction: Transaction): boolean {
        const index = this.transactions.indexOf(transaction);
        if (index === -1) {
            return false;
        }
        this.transactions.splice(index, 1);
        return true;
    }
}
