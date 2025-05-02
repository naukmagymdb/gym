import { apiFetch } from './apiFetch';

export const createEntity = async <EntityType>(
  url: string,
  entity: EntityType,
) => {
  const response = await apiFetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(entity),
  });

  return response;
};

export const editEntity = async <EntityType>(
  url: string,
  entity: EntityType,
) => {
  const response = await apiFetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(entity),
  });

  return response;
};

export const deleteEntity = async (url: string) => {
  const response = await apiFetch(url, {
    method: 'DELETE',
  });

  return response;
};
