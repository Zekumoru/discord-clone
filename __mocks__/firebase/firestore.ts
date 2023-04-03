import { vi } from 'vitest';
import {
  DocumentData,
  Firestore,
  FirestoreDataConverter,
} from 'firebase/firestore';
import * as firestore from 'firebase/firestore';

const getWithConverter = () => {
  let _converter: null | FirestoreDataConverter<DocumentData> = null;
  return {
    get converter() {
      return _converter;
    },
    withConverter: <T extends DocumentData>(
      converter: FirestoreDataConverter<T>
    ) => {
      _converter = converter;
    },
  };
};

const getFirestore = () => {};

const doc = vi.fn((_f: Firestore, path: string, ...pathSegments: string[]) => {
  return {
    type: 'document',
    path: path.concat(...pathSegments),
    ...getWithConverter(),
  } as ReturnType<typeof firestore.doc>;
});

const collection = vi.fn(
  (_f: Firestore, path: string, ...pathSegments: string[]) => {
    return {
      type: 'collection',
      path: path.concat(...pathSegments),
      ...getWithConverter(),
    } as ReturnType<typeof firestore.collection>;
  }
);

const query = vi.fn();

const getDocs = vi.fn(firestore.getDocs);

export * from 'firebase/firestore';
export { getFirestore, doc, collection, query, getDocs };
