import { ApiClient } from '@/lib/api-client';
import { Specialty, User } from '@/types/api';

export const getMe = async () => ApiClient.get<User>('/users/me');

export const getSpecialties = async () =>
  ApiClient.get<Specialty[]>('/specialty');

export const updateMe = async (data: Partial<User>) =>
  ApiClient.put<User>('/doctors/me', data);
