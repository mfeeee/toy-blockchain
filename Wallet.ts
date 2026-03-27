import * as crypto from 'crypto';

export class Wallet {
    public publicKey: string;
    public privateKey: string;

    constructor() {
        const keypair = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: { type: 'spki', format: 'pem' },
            privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
        });
        this.publicKey = keypair.publicKey;
        this.privateKey = keypair.privateKey;
    }

    sign(data: string): Buffer {
        const sign = crypto.createSign('SHA256');
        sign.update(data).end();
        return sign.sign(this.privateKey);
    }
}