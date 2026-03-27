import * as crypto from 'crypto';
import type { CertificateData } from "./model.js";

export class Transaction {
    public sender: string;
    public recipient: string;
    public certificateData: CertificateData;
    public signature: Buffer;

    constructor(sender: string, recipient: string, certificateData: CertificateData, signature: Buffer) {
        this.sender = sender;
        this.recipient = recipient;
        this.certificateData = certificateData;
        this.signature = signature;
    }

    toJSON() {
        return {
            sender: this.sender,
            recipient: this.recipient,
            certificateData: this.certificateData,
            signature: this.signature.toString('base64'),
        };
    }

    isValid(): boolean {
        const verifier = crypto.createVerify('SHA256');
        const payload = JSON.stringify({
            sender: this.sender,
            recipient: this.recipient,
            certificateData: this.certificateData,
        });
        verifier.update(payload).end();
        return verifier.verify(this.sender, this.signature);
    }
}