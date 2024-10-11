import { ApiClient } from '@/lib/api-client';
import { Prescription } from '@/types/api';

interface CreatePrescriptionDto {
  diagnosis: string;
  medication: string;
  presentation: string;
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
  return await ApiClient.post<Prescription>('/prescriptions/no-patient', data);
};

export const createPrescriptionExistingPatient = async (
  data: CreatePrescriptionExistingPatientDto,
) => {
  return await ApiClient.post<Prescription>('/prescriptions', data);
};
