'use client';

import { Role } from '@/types';
import { createContext } from 'react';

export type AuthContextType = {
  userId: number | null;
  role: Role | null;
};

export const AuthContext = createContext<AuthContextType>({
  userId: null,
  role: null,
});
