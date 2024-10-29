import { parse } from 'date-fns';

import { ApiClient } from '@/lib/api-client';
import { Prescription } from '@/types/api';

interface CreatePrescriptionDto {
  diagnosis: string;
  medicationId: string;
  presentationId: string;
  units: string;
  [key: string]: string | number | any;
}

interface CreatePrescriptionNoPatientDto extends CreatePrescriptionDto {
  email: string;
  dni: number;
  name: string;
  lastName: string;
  birthDate: string;
  affiliateNumber: number;
  insuranceCompanyId: string;
}

interface CreatePrescriptionExistingPatientDto extends CreatePrescriptionDto {
  patientId: number;
}

export const createPrescriptionNoPatient = async (
  data: CreatePrescriptionNoPatientDto,
) => {
  return await ApiClient.post<Prescription>('/prescriptions/patientless', {
    ...data,
    quantity: data.units,
    indication: data.diagnosis,
    birthDate: parse(data.birthDate, 'dd/MM/yyyy', new Date()).toISOString(),
  });
};

export const createPrescriptionExistingPatient = async (
  data: CreatePrescriptionExistingPatientDto,
) => {
  return await ApiClient.post<Prescription>('/prescriptions', {
    ...data,
    quantity: data.units,
    indication: data.diagnosis,
  });
};
