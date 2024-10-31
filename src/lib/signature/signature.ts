import { md as forgeMd, pss as forgePss, mgf as forgeMgf, util, pki } from 'node-forge';
import { PrivateKey } from "./types";
import { ApiClient } from "../api-client";

export class SignatureService {

    // Returns a base64 encoding of the signature
    async sign(data: string): Promise<string> {
        const privateKey = await this.getPrivateKey();

        const md = forgeMd.sha1.create();
        md.update(data, 'utf8');
        const pss = forgePss.create({
            md: forgeMd.sha1.create(),
            mgf: forgeMgf.mgf1.create(forgeMd.sha1.create()),
            saltLength: 20
        });
        return util.encode64(privateKey.sign(md, pss));
    }

    private async getPrivateKey(): Promise<PrivateKey> {
        const { privateKey: pem } = await ApiClient.get<{ privateKey: string }>('/doctors/private-key');

        return pki.privateKeyFromPem(pem);
    }
}