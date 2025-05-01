import { apiFetch } from './apiFetch';

export const login = async (phone: string, password: string) => {
    const response = await apiFetch('/auth/admin/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, password, role: 'admin' }),
    });

    return response;
};
