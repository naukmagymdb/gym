const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const apiFetch = async (url: string, options: RequestInit = {}) => {
  console.log(`apiFetch: ${apiUrl}${url}`);
  const response = await fetch(`${apiUrl}${url}`, {
    ...options,
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const apiGetFetcher = async (url: string) => {
  console.log(`apiGetFetcher: ${apiUrl}${url}`);
  const response = await fetch(`${apiUrl}${url}`, {
    credentials: 'include',
    method: 'GET',
  });

  return response.json();
};
