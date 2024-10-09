import { parseISO, format } from 'date-fns';

import { ApiClient } from '@/lib/api-client';
import { InsuranceCompany, Patient } from '@/types/api';

export const getPatients = async () => ApiClient.get<Patient[]>('/patients');

export const getPatient = async (id: string) => {
  const patient = await ApiClient.get<Patient>(`/patients/${id}`);
  return {
    ...patient,
    birthDate: format(parseISO(patient.birthDate), 'dd/MM/yyyy'),
  };
};

export const getInsuranceCompanies = async () =>
  ApiClient.get<InsuranceCompany[]>('/insurance');
