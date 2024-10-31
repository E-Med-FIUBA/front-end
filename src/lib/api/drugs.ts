import { Drug } from '@/types/api';

import { ApiClient } from '../api-client';

export const getDrugs = async () => ApiClient.get<Drug[]>('/drugs');

export const getDrug = async (id: number) =>
  ApiClient.get<Drug>(`/drugs/${id}`);
