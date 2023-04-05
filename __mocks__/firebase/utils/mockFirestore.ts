import { vi } from 'vitest';
import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  Firestore,
  Query,
  QuerySnapshot,
  Unsubscribe,
  WithFieldValue,
  WriteBatch,
} from 'firebase/firestore';
import retrievePathAndDocName from './retrievePathAndDocName';

type TFirestoreDoc<T = DocumentData> = { [P: string]: T };

const firestoreCollections = new Map<string, TFirestoreDoc>();
const snapshotCallbacks = new Map<string, (snapshot: QuerySnapshot) => void>();

const mockFirestoreCollection = <T extends DocumentData>(
  path: string,
  data: TFirestoreDoc<T>
) => {
  firestoreCollections.set(path, data);
};

const mockFirestoreDocument = <T extends DocumentData>(
  path: string,
  data: T
) => {
  const [collectionPath, docName] = retrievePathAndDocName(path);
  const collection = firestoreCollections.get(collectionPath);
  if (collection === undefined) {
    firestoreCollections.set(collectionPath, {
      [docName]: data,
    });
  } else {
    collection[docName] = data;
  }
};

const peekMockedFirestoreCollection = <T extends DocumentData>(
  path: string
) => {
  return firestoreCollections.get(path) as TFirestoreDoc<T>;
};

const getMockedFirestoreCollection = <T extends DocumentData>(
  path: string
): T[] => {
  const collectionData = firestoreCollections.get(path) ?? {};
  return Object.values(collectionData) as T[];
};

const mockResetFirestoreCollection = () => {
  firestoreCollections.clear();
  snapshotCallbacks.clear();
};

const updateMockedOnSnapshot = (query: Query) => {
  if ('path' in query && typeof query.path === 'string') {
    snapshotCallbacks.get(query.path)?.(getQuerySnapshot(query));
  }
};

const getQuerySnapshot = (query: Query) => {
  let path = '';
  if ('path' in query) {
    path = query.path as string;
  }

  const docs = firestoreCollections.get(path) ?? ({} as TFirestoreDoc);
  const keys = Object.keys(docs);

  return {
    docs: keys.map((key) => ({
      data: () => docs[key],
    })),
    empty: keys.length === 0,
    size: keys.length,
  } as QuerySnapshot;
};

const setDoc = vi.fn<[DocumentReference, WithFieldValue<DocumentData>]>(
  async (query, data) => {
    mockFirestoreDocument(query.path, data);
  }
);

const getDoc = vi.fn<[DocumentReference], Promise<DocumentSnapshot>>(
  async (query) => {
    const [collectionPath, docName] = retrievePathAndDocName(query.path);
    const docs =
      firestoreCollections.get(collectionPath) ?? ({} as TFirestoreDoc);

    return {
      data: () => docs[docName],
    } as DocumentSnapshot;
  }
);

const getDocs = vi.fn<[Query], Promise<QuerySnapshot>>(async (query) => {
  return getQuerySnapshot(query);
});

const onSnapshot = vi.fn<
  [Query, (snapshot: QuerySnapshot) => void],
  Unsubscribe
>((query, onNext) => {
  onNext(getQuerySnapshot(query));
  if ('path' in query && typeof query.path === 'string') {
    snapshotCallbacks.set(query.path, onNext);
  }
  return () => {};
});

const writeBatch = vi.fn((_f: Firestore) => {
  return {
    set: vi.fn<[DocumentReference, WithFieldValue<DocumentData>]>(
      (query, data) => setDoc(query, data)
    ),
    update: vi.fn(),
    delete: vi.fn(),
    commit: vi.fn(),
  } as unknown as WriteBatch;
});

export {
  setDoc,
  getDoc,
  getDocs,
  onSnapshot,
  writeBatch,
  updateMockedOnSnapshot,
  mockFirestoreDocument,
  mockFirestoreCollection,
  mockResetFirestoreCollection,
  peekMockedFirestoreCollection,
  getMockedFirestoreCollection,
};
