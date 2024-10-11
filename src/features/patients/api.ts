import { parse } from 'date-fns';

import { ApiClient } from '@/lib/api-client';
import { Patient } from '@/types/api';

export interface CreatePatientDto {
  doctorId: string;
  birthDate: string;
  insuranceCompanyId: string;
  affiliateNumber: string;
  dni: string;
  email: string;
  name: string;
  lastName: string;
  sex: string;
}

export interface UpdatePatientDto extends CreatePatientDto {
  id: string;
}

export const getPatients = async () => ApiClient.get<Patient[]>('/patients');

export const createPatient = async (patient: CreatePatientDto) =>
  ApiClient.post('/patients', {
    doctorId: Number(patient.doctorId),
    birthDate: parse(patient.birthDate, 'dd/MM/yyyy', new Date()).toISOString(),
    insuranceCompanyId: Number(patient.insuranceCompanyId),
    affiliateNumber: Number(patient.affiliateNumber),
    dni: Number(patient.dni),
    email: patient.email,
    name: patient.name,
    lastName: patient.lastName,
    sex: patient.sex,
  });

export const updatePatient = async (patient: UpdatePatientDto) =>
  ApiClient.put(`/patients/${patient.id}`, {
    doctorId: Number(patient.doctorId),
    birthDate: parse(patient.birthDate, 'dd/MM/yyyy', new Date()).toISOString(),
    insuranceCompanyId: Number(patient.insuranceCompanyId),
    affiliateNumber: Number(patient.affiliateNumber),
    dni: Number(patient.dni),
    email: patient.email,
    name: patient.name,
    lastName: patient.lastName,
    sex: patient.sex,
  });

export const deletePatient = async (id: number) =>
  ApiClient.delete(`/patients/${id}`);
