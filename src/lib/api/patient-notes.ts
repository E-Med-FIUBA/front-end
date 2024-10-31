import { PatientNote } from '@/types/api';

import { ApiClient } from '../api-client';

export const deletePatientNote = async (id: number): Promise<PatientNote> =>
  ApiClient.delete(`/patient-notes/${id}`);

export const editPatientNote = async (
  id: number,
  note: string,
): Promise<PatientNote> => ApiClient.put(`/patient-notes/${id}`, { note });
