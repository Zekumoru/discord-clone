import { vi } from 'vitest';
import * as firestore from 'firebase/firestore';
import getWithConverter from './utils/getWithConverter';
import {
  setDoc,
  getDoc,
  getDocs,
  writeBatch,
  onSnapshot,
} from './utils/mockFirestoreCollection';
import FirebaseError from './utils/FirebaseError';

const getFirestore = () => {};

const doc = vi.fn(
  (_f: firestore.Firestore, path: string, ...pathSegments: string[]) => {
    const realPath = [path, ...pathSegments].join('/');

    const segments = realPath.split('/');
    if (segments.length % 2 !== 0) {
      throw new FirebaseError(
        `Invalid document reference. Document references must have an even number of segments, but ${path} has ${segments.length}.`
      );
    }

    return {
      type: 'document',
      path: realPath,
      ...getWithConverter(),
    } as firestore.DocumentReference;
  }
);

const collection = vi.fn(
  (_f: firestore.Firestore, path: string, ...pathSegments: string[]) => {
    const realPath = [path, ...pathSegments].join('/');

    const segments = realPath.split('/');
    if (segments.length % 2 === 0) {
      throw new FirebaseError(
        `Invalid collection reference. Collection references must have an odd number of segments, but ${path} has ${segments.length}.`
      );
    }

    return {
      type: 'collection',
      path: realPath,
      ...getWithConverter(),
    } as firestore.CollectionReference;
  }
);

const query = vi.fn((query) => query);

const serverTimestamp = vi.fn((): firestore.Timestamp => {
  const date = new Date();
  return {
    toDate: () => date,
    toMillis: () => date.getMilliseconds(),
    nanoseconds: date.getMilliseconds() * 1000,
    seconds: date.getSeconds(),
  } as firestore.Timestamp;
});

export * from 'firebase/firestore';
export {
  getFirestore,
  doc,
  collection,
  query,
  setDoc,
  getDoc,
  getDocs,
  writeBatch,
  onSnapshot,
  serverTimestamp,
};
