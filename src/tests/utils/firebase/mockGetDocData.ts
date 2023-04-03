import {
  DocumentData,
  DocumentReference,
  QueryDocumentSnapshot,
  getDoc,
} from 'firebase/firestore';

const mockDocumentData = <T extends DocumentData>(data: T) => {
  return {
    data: () => data,
  } as QueryDocumentSnapshot<T>;
};

const mockGetDocData = (mockedQuerySnapshots?: {
  [P: string]: QueryDocumentSnapshot;
}) => {
  vi.mocked(getDoc).mockImplementation(async (query) => {
    const snapshot = mockedQuerySnapshots?.[(query as DocumentReference).path];

    if (snapshot === undefined) {
      return {
        data: () => ({}),
      } as QueryDocumentSnapshot;
    }

    return snapshot as QueryDocumentSnapshot;
  });
};

export default mockGetDocData;
export { mockDocumentData };
