import { vi } from 'vitest';
import * as auth from 'react-firebase-hooks/auth';

export * from 'react-firebase-hooks/auth';

export const useAuthState = vi.fn(auth.useAuthState);
export const useSendPasswordResetEmail = vi.fn(auth.useSendPasswordResetEmail);
export const useCreateUserWithEmailAndPassword = vi.fn(
  auth.useCreateUserWithEmailAndPassword
);
export const useSignInWithEmailAndPassword = vi.fn(
  auth.useSignInWithEmailAndPassword
);
