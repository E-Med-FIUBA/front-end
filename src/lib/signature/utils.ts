import * as forge from 'node-forge';

export function isValidCert(pem: string): boolean {
    try {
        const cert = forge.pki.certificateFromPem(pem);
        return !!cert;
    } catch (error) {
        console.error('Invalid certificate:', error);
        return false;
    }
}

export function isValidPrivateKey(pem: string): boolean {
    try {
        const key = forge.pki.privateKeyFromPem(pem);
        return !!key;
    } catch (error) {
        console.error('Invalid key:', error);
        return false;
    }
}