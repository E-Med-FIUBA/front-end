import { parse } from 'date-fns';
import {
  md as forgeMd,
  pss as forgePss,
  mgf as forgeMgf,
  util,
  pki,
} from 'node-forge';

import { Drug, InsuranceCompany, Presentation } from '@/types/api';

import { UserData } from '../auth';

import { PrivateKey } from './types';

export class SignatureService {
  // Returns a base64 encoding of the signature
  async sign(data: string, privateKeyPEM: string): Promise<string> {
    const privateKey = pki.privateKeyFromPem(privateKeyPEM) as PrivateKey;
    const md = forgeMd.sha1.create();
    md.update(data, 'utf8');
    const pss = forgePss.create({
      md: forgeMd.sha1.create(),
      mgf: forgeMgf.mgf1.create(forgeMd.sha1.create()),
      saltLength: 20,
    });
    return util.encode64(privateKey.sign(md, pss));
  }

  generateDataFromPrescription(
    formData: any,
    user: UserData,
    insuranceCompany: InsuranceCompany,
    drug: Drug,
    presentation: Presentation,
  ): string {
    const data = {
      professional: {
        fullName: `${user?.name} ${user?.lastName}`,
        professionSpecialty: user?.specialty,
        license: user?.license,
      },
      patient: {
        fullName: `${formData.name} ${formData.lastName}`,
        insurancePlan: insuranceCompany!.name,
        birthDate: parse(
          formData.birthDate,
          'dd/MM/yyyy',
          new Date(),
        ).toISOString(),
        sex: formData.sex,
        dni: formData.dni,
      },
      prescription: {
        genericName: drug!.name,
        presentationName: presentation!.name,
        pharmaceuticalForm: presentation!.form,
        unitCount: formData.units,
        diagnosis: formData.diagnosis,
      },
      date: formData.emitedAt,
    };
    return JSON.stringify(data);
  }
}
