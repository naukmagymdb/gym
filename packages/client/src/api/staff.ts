import { apiFetch } from './apiFetch';

export const getStaff = async () => {
  const response = await apiFetch('/staff', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });

  return response;
};
