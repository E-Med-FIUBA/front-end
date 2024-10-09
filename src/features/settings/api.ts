import { ApiClient } from '@/lib/api-client';
import { User } from '@/types/api';

export const getMe = async () => ApiClient.get<User>('/users/me');

export const updateMe = async (data: Partial<User>) =>
  ApiClient.put<User>('/doctors/me', data);
