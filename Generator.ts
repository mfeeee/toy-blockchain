import { Transaction } from './Transaction.js';
import type { CertificateData } from './model.js';
import { Wallet } from './Wallet.js';

const recipientList = ['recipient-A', 'recipient-B', 'recipient-C', 'recipient-D'];
const courseList = ['Blockchain Básico', 'Criptografia Aplicada', 'Redes Distribuídas'];

function randomFrom<T>(items: readonly T[]): T {
    const index = Math.floor(Math.random() * items.length);
    return items[index]!;
}

function createCertificateData(): CertificateData {
    return {
        aluno: `Aluno ${Math.floor(Math.random() * 1000)}`,
        curso: randomFrom(courseList),
        instituicao: 'Instituto Exemplo',
        cargaHoraria: 40,
        dataEmissao: new Date().toISOString(),
    };
}

export function createTestTransaction(): Transaction {
    const senderWallet = new Wallet();
    const recipient = randomFrom(recipientList);
    const certificateData = createCertificateData();
    const payload = JSON.stringify({ sender: senderWallet.publicKey, recipient, certificateData });
    const signature = senderWallet.sign(payload);

    return new Transaction(senderWallet.publicKey, recipient, certificateData, signature);
}
