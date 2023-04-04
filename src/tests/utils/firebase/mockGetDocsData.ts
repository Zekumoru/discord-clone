import {
  CollectionReference,
  DocumentData,
  QuerySnapshot,
  getDocs,
} from 'firebase/firestore';

const mockCollectionData = <T extends DocumentData>(...data: T[]) => {
  return {
    docs: data.map((data) => ({
      data: () => data,
    })),
    empty: data.length === 0,
    size: data.length,
  } as QuerySnapshot<T>;
};

const mockGetDocsData = (mockedQuerySnapshots?: {
  [P: string]: QuerySnapshot;
}) => {
  vi.mocked(getDocs).mockImplementation(async (query) => {
    const snapshot =
      mockedQuerySnapshots?.[(query as CollectionReference).path];

    if (snapshot === undefined) {
      return {
        docs: [] as DocumentData[],
        empty: true,
        size: 0,
      } as QuerySnapshot;
    }

    return snapshot as QuerySnapshot;
  });
};

export default mockGetDocsData;
export { mockCollectionData };
