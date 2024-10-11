import { format, parseISO } from 'date-fns';

import { InsuranceCompany, Patient } from '@/types/api';

import { ApiClient } from '../api-client';

export const getPatient = async (id: string): Promise<Patient> => {
  const patient = await ApiClient.get<Patient>(`/patients/${id}`);
  return {
    ...patient,
    birthDate: format(parseISO(patient.birthDate), 'dd/MM/yyyy'),
  };
};

export const getInsuranceCompanies = async () =>
  ApiClient.get<InsuranceCompany[]>('/insurance');
