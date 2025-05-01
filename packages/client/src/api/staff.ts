import { apiFetch } from './apiFetch';

export const getStaff = async () => {
  const response = await apiFetch('/staff', {
    method: 'GET',
  });

  return response;
};
