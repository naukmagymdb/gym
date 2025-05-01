import { Role } from '@/types';
import { apiFetch } from './apiFetch';

export const login = async (phone: string, password: string, role: Role) => {
  const url = role === 'admin' ? '/auth/admin/login' : '/auth/login';

  const response = await apiFetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ phone, password, role }),
  });

  return response;
};
