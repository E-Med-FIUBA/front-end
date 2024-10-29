import { pki, random, pkcs5, cipher as forgeCipher, util } from "node-forge";
import { CipherConfig, KeyPair, PEM, PrivateKey, } from "./types";

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

        return { csr: generateCSR(keys, doctorData), privateKey: pki.privateKeyToPem(keys.privateKey) }
    }

    public getPrivateKey(password: string) {
        const privateKey = localStorage.getItem('privateKey');

        if (!privateKey) {
            throw new Error('No private key set');
        }

        return this.decrypt(password, privateKey);
    }

    private storePrivateKey(password: string, privateKey: PrivateKey) {
        localStorage.setItem('privateKey', this.encrypt(password, privateKey))
    }

    private generateCipherConfig(password: string): CipherConfig {
        let salt = safeAtob(localStorage.getItem('salt'));
        let iv = safeAtob(localStorage.getItem('iv'));
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

// Generate RSA key pair (2048-bit)
export function generateKeyPair(): KeyPair {
    return pki.rsa.generateKeyPair(2048);
}

export function generateCSR(keys: KeyPair, doctor: DoctorData): PEM {
    const csr = pki.createCertificationRequest();
    csr.publicKey = keys.publicKey;
    csr.setSubject([{
        // Cambiar a nombre doctor
        name: 'commonName',
        value: `${doctor.name} ${doctor.lastName}`
    }, {
        // Cambiar a dinamico
        name: 'countryName',
        value: doctor.countryName
    }, {
        // Cambiar a dinamico
        shortName: 'ST',
        value: doctor.province
    }, {
        // Cambiar a dinamico
        name: 'localityName',
        value: doctor.localityName
    }, {
        name: 'organizationName',
        value: 'EMED'
    }, {
        shortName: 'OU',
        value: 'doctors'
    }]);

    csr.sign(keys.privateKey);

    return pki.certificationRequestToPem(csr);
}

export function safeAtob(bytes: string | null) {
    if (!bytes) {
        return null
    }

    return bytes ? util.decode64(bytes) : null
}

function hexToString(hex: string) {
    // Remove any spaces or non-hex characters
    hex = hex.replace(/[^0-9A-Fa-f]/g, '');

    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
        // Get each pair of hex digits
        const byte = hex.substr(i, 2);
        // Convert hex to decimal and then to character
        str += String.fromCharCode(parseInt(byte, 16));
    }
    return str;
}