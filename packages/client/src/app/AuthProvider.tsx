'use client';

import { apiGetFetcher } from '@/api/apiFetch';
import useSWR from 'swr';
import { AuthContext } from './AuthContext';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, error } = useSWR('/dashboard', apiGetFetcher);
  console.log(data, error);

  return (
    <AuthContext.Provider value={{ userId: data?.id, role: data?.role }}>
      {children}
    </AuthContext.Provider>
  );
}
