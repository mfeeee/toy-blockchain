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
}