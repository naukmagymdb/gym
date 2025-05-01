'use client';

import { apiFetch } from '@/api/apiFetch';
import useSWR from 'swr';
import { AuthContext } from './AuthContext';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = useSWR('/dashboard', apiFetch);
  console.log(data);

  return (
    <AuthContext.Provider value={{ userId: data?.id, role: data?.role }}>
      {children}
    </AuthContext.Provider>
  );
}
