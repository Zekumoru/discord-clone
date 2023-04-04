import { vi } from 'vitest';
import * as firestore from 'firebase/firestore';

const getWithConverter = <
  T extends firestore.DocumentReference | firestore.CollectionReference
>() => {
  let _converter: null | firestore.FirestoreDataConverter<firestore.DocumentData> =
    null;
  return {
    get converter() {
      return _converter;
    },
    withConverter<T extends firestore.DocumentData>(
      converter: firestore.FirestoreDataConverter<T>
    ) {
      _converter = converter;
      return this as T;
    },
  };
};

const getFirestore = () => {};

const doc = vi.fn(
  (_f: firestore.Firestore, path: string, ...pathSegments: string[]) => {
    type Reference = ReturnType<typeof firestore.doc>;
    return {
      type: 'document',
      path: path.concat(...pathSegments),
      ...getWithConverter<Reference>(),
    } as Reference;
  }
);

const collection = vi.fn(
  (_f: firestore.Firestore, path: string, ...pathSegments: string[]) => {
    type Reference = ReturnType<typeof firestore.collection>;
    return {
      type: 'collection',
      path: path.concat(...pathSegments),
      ...getWithConverter<Reference>(),
    } as Reference;
  }
);

const query = vi.fn((query) => query);

const getDoc = vi.fn(firestore.getDoc);

const getDocs = vi.fn(firestore.getDocs);

const writeBatch = vi.fn((_f: firestore.Firestore) => {
  return {
    set: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    commit: vi.fn(),
  } as unknown as firestore.WriteBatch;
});

const onSnapshot = vi.fn(firestore.onSnapshot);

export * from 'firebase/firestore';
export {
  getFirestore,
  doc,
  collection,
  query,
  getDoc,
  getDocs,
  writeBatch,
  onSnapshot,
};
