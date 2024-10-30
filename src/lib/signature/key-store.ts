import { pki, random, pkcs5, cipher as forgeCipher, util } from "node-forge";
import { CipherConfig, CSR, PEM, PrivateKey, } from "./types";
import { generateCSR, generateKeyPair, safeDecode } from "./utils";

export interface DoctorData {
    name: string;
    lastName: string;
    countryName: string;
    province: string;
    localityName: string;
    password: string;
}

export class KeyStore {
    cipher: forgeCipher.Algorithm = 'AES-CBC';
    key: string | undefined;

    public generateCredentials(doctorData: DoctorData): { csr: PEM, privateKey: PEM } {
        const keys = generateKeyPair();

        this.storePrivateKey(doctorData.password, keys.privateKey);

        const csr = generateCSR(keys, doctorData)
        this.storeCertificateRequest(csr);

        return { csr: pki.certificationRequestToPem(csr), privateKey: pki.privateKeyToPem(keys.privateKey) }
    }


    private storeCertificateRequest(csr: CSR) {
        localStorage.setItem('csr', pki.certificationRequestToPem(csr));
    }

    public getCSR(): CSR {
        const csrPEM = localStorage.getItem('csr');

        if (!csrPEM) {
            throw new Error('No CSR set');
        }
        return pki.certificationRequestFromPem(csrPEM);
    }

    public getPrivateKey(password: string): PrivateKey {
        const privateKey = localStorage.getItem('privateKey');

        if (!privateKey) {
            throw new Error('No private key set');
        }

        return pki.privateKeyFromPem(this.decrypt(password, privateKey));
    }

    private storePrivateKey(password: string, privateKey: PrivateKey) {
        localStorage.setItem('privateKey', this.encrypt(password, privateKey))
    }

    private generateCipherConfig(password: string): CipherConfig {
        let salt = safeDecode(localStorage.getItem('salt'));
        let iv = safeDecode(localStorage.getItem('iv'));
        if (!salt) {
            salt = random.getBytesSync(128);
            localStorage.setItem('salt', util.encode64(salt));
        }
        if (!iv) {
            iv = random.getBytesSync(16);
            localStorage.setItem('iv', util.encode64(iv));
        }

        return { salt, iv, key: this.getCipherKey(password, salt) }
    }

    private getCipherKey(password: string, salt: string): string {
        if (!this.key) {
            this.key = pkcs5.pbkdf2(password, salt, parseInt(import.meta.env.VITE_SALT_ROUNDS), parseInt(import.meta.env.VITE_KEY_SIZE));
        }

        return this.key;
    }

    private encrypt(password: string, privateKey: PrivateKey): string {
        const { iv, key } = this.generateCipherConfig(password);

        const cipher = forgeCipher.createCipher(this.cipher, key);
        cipher.start({ iv: iv });
        cipher.update(util.createBuffer(pki.privateKeyToPem(privateKey)));
        cipher.finish();
        return cipher.output.toHex();
    }

    decrypt(password: string, data: string): string {
        const { iv, key } = this.generateCipherConfig(password);

        data = util.hexToBytes(data);
        const decipher = forgeCipher.createDecipher(this.cipher, key);
        decipher.start({ iv: iv });
        decipher.update(util.createBuffer(data));
        const result = decipher.finish();
        if (!result) {
            throw new Error('Invalid decipher');
        }
        return decipher.output.toString();
    }
}

