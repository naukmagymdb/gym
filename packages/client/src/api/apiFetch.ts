const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const apiFetch = async (url: string, options: RequestInit = {}) => {
    const response = await fetch(`${apiUrl}${url}`, {
        ...options,
    });

    if (!response.ok) {
        console.error(`API error: ${response.status} ${response.statusText}`);
        throw new Error(`${response.status} ${response.statusText}`);
    }

    return response.json();
};
