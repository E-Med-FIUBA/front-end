import { ApiClient } from '@/lib/api-client';
import { Prescription } from '@/types/api';

export const getPrescriptionHistory = async (): Promise<Prescription[]> =>
  ApiClient.get('/prescriptions');
