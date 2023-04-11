import { vi } from 'vitest';
import { WriteBatch } from 'firebase/firestore';

export const withConverter = vi.fn(() => ({}));
export const doc = vi.fn(() => ({
  withConverter,
}));

export const serverTimestamp = vi.fn(() => ({}));

export const getFirestore = vi.fn();
export const writeBatch = vi.fn(
  () =>
    ({
      set: (_, data) => {},
      update: (_, data) => {},
      delete: (_) => {},
      commit: () => {},
    } as WriteBatch)
);

export const getDoc = vi.fn();
