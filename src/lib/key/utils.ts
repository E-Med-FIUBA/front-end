import { pki } from "node-forge";
import { KeyPair } from "./types";

// Generate RSA key pair (2048-bit)
export async function generateKeyPair() {
    return pki.rsa.generateKeyPair(2048);
}

export async function generateCSR(keys: KeyPair) {
    var csr = pki.createCertificationRequest();
    csr.publicKey = keys.publicKey;
    csr.setSubject([{
        name: 'commonName',
        value: 'example.org'
    }, {
        name: 'countryName',
        value: 'US'
    }, {
        shortName: 'ST',
        value: 'Virginia'
    }, {
        name: 'localityName',
        value: 'Blacksburg'
    }, {
        name: 'organizationName',
        value: 'Test'
    }, {
        shortName: 'OU',
        value: 'Test'
    }]);
    // set (optional) attributes
    csr.setAttributes([{
        name: 'challengePassword',
        value: 'password'
    }, {
        name: 'unstructuredName',
        value: 'My Company, Inc.'
    }, {
        name: 'extensionRequest',
        extensions: [{
            name: 'subjectAltName',
            altNames: [{
                // 2 is DNS type
                type: 2,
                value: 'test.domain.com'
            }, {
                type: 2,
                value: 'other.domain.com',
            }, {
                type: 2,
                value: 'www.domain.net'
            }]
        }]
    }]);

    csr.sign(keys.privateKey);

    return pki.certificationRequestToPem(csr);
}