import { Mempool } from './Mempool.js';
import { createTestTransaction } from './Generator.js';

const mempool = new Mempool();
const generationIntervalSeconds = 5;

console.log('Iniciando gerador de transações.');
setInterval(() => {
    const transaction = createTestTransaction();
    mempool.add(transaction);
    console.log(`Transação adicionada. Mempool size=${mempool.size()}`);
}, generationIntervalSeconds * 1000);
