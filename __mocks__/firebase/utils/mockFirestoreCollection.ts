import { vi } from 'vitest';
import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  Query,
  QuerySnapshot,
  Unsubscribe,
} from 'firebase/firestore';

type TFirestoreDoc<T = DocumentData> = { [P: string]: T };

const firestoreCollections = new Map<string, TFirestoreDoc>();

const mockFirestoreCollection = <T extends DocumentData>(
  path: string,
  data: TFirestoreDoc<T>
) => {
  firestoreCollections.set(path, data);
};

const mockResetFirestoreCollection = () => {
  firestoreCollections.clear();
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

const getDoc = vi.fn<[DocumentReference], Promise<DocumentSnapshot>>(
  async (query) => {
    let docName = '';
    let collectionPath = '';

    if ('path' in query) {
      const path = query.path as string;
      const slashIndex = path.lastIndexOf('/');
      docName = path.substring(slashIndex + 1);
      collectionPath = path.substring(0, slashIndex);
    }

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
  return () => {};
});

export default mockFirestoreCollection;
export { getDoc, getDocs, onSnapshot, mockResetFirestoreCollection };
