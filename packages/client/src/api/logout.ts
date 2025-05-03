import { Role } from '@/types';
import { apiFetch } from './apiFetch';

export const logout = async (userId: number, role: Role) => {
  console.log('loging out');
  try {
    // Determine the logout URL based on the user's role
    const url = role === 'admin' ? '/auth/logout' : '/auth/logout';

    // Make the API call to the logout endpoint
    const response = await apiFetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, role }), // Send userId and role in the body
    });

    console.log('Logout response:', response);

    // Check if the response is successful
    if (response.message != 'Logged out successfully') {
      throw new Error(`Logout failed: ${response.statusText}`);
    }

    // Clear local storage or any client-side session data
    localStorage.removeItem('token');

    // Optionally, redirect the user to the login page
    window.location.href = '/login';

    return response;
  } catch (error) {
    console.error('Error during logout:', error);
    throw error; // Re-throw the error to handle it in the calling code
  }
};
