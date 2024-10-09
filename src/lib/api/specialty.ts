import { Specialty } from '@/types/api';

import { ApiClient } from '../api-client';

export const getSpecialties = async () =>
  ApiClient.get<Specialty[]>('/specialty');
