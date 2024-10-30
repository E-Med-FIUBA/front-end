import { KeyStore } from "./key-store";
import { md as forgeMd, pss as forgePss, mgf as forgeMgf, util } from 'node-forge';
import { PublicKey } from "./types";

export class SignatureService {
    private keyStore: KeyStore;

    constructor() {
        this.keyStore = new KeyStore();
    }

    // Returns a base64 encoding of the signature
    sign(password: string, data: string): string {
        const privateKey = this.keyStore.getPrivateKey(password);

        const md = forgeMd.sha1.create();
        md.update(data, 'utf8');
        const pss = forgePss.create({
            md: forgeMd.sha1.create(),
            mgf: forgeMgf.mgf1.create(forgeMd.sha1.create()),
            saltLength: 20
        });
        return util.encode64(privateKey.sign(md, pss));
    }

    verify(data: string, signature: string): boolean {
        const pss = forgePss.create({
            md: forgeMd.sha1.create(),
            mgf: forgeMgf.mgf1.create(forgeMd.sha1.create()),
            saltLength: 20
            // optionally pass 'prng' with a custom PRNG implementation
        });
        const md = forgeMd.sha1.create();
        md.update(data, 'utf8');

        const publicKey = this.keyStore.getCSR().publicKey! as PublicKey;

        return publicKey.verify(md.digest().getBytes(), util.decode64(signature), pss);
    }
}