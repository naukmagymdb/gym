'use client';

import { apiFetch } from '@/api/apiFetch';
import useSWRImmutable from 'swr/immutable';
import { AuthContext } from './AuthContext';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, error } = useSWRImmutable('/dashboard', apiFetch, {
    revalidateIfStale: false,
  });
  console.log(data, error);

  return (
    <AuthContext.Provider value={{ userId: data?.id, role: data?.role }}>
      {children}
    </AuthContext.Provider>
  );
}
