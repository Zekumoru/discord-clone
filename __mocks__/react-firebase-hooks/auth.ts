import { vi } from 'vitest';
import * as reactFirebaseHooksAuth from 'react-firebase-hooks/auth';

const useAuthState = vi.fn(reactFirebaseHooksAuth.useAuthState);

const useCreateUserWithEmailAndPassword = vi.fn(
  reactFirebaseHooksAuth.useCreateUserWithEmailAndPassword
);

const useSignInWithEmailAndPassword = vi.fn(
  reactFirebaseHooksAuth.useSignInWithEmailAndPassword
);

const useSendPasswordResetEmail = vi.fn(
  reactFirebaseHooksAuth.useSendPasswordResetEmail
);

export * from 'react-firebase-hooks/auth';
export {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
  useSendPasswordResetEmail,
};
