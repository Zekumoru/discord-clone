import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  setDoc,
  writeBatch,
} from 'firebase/firestore';
import {
  mockFirestoreCollection,
  getMockedFirestoreCollection,
  mockResetFirestoreCollection,
} from '../utils/mockFirestore';
import { vi } from 'vitest';

vi.mock('firebase/firestore');

describe('mockFirestoreCollection', () => {
  afterEach(() => {
    mockResetFirestoreCollection();
  });

  it('should add the new document to mocked firestore db', async () => {
    type TData = { data: string };
    const fooRef = doc(getFirestore(), 'data/foo');

    await setDoc(fooRef, { data: 'foo' } as TData);

    expect(getMockedFirestoreCollection('data')).toEqual<TData[]>([
      { data: 'foo' },
    ]);
  });

  it('should add the new document with nested path to mocked firestore db', async () => {
    type TData = { data: string };
    const fooRef = doc(getFirestore(), 'some/other/data/foo');

    await setDoc(fooRef, { data: 'foo' } as TData);

    expect(getMockedFirestoreCollection('some/other/data')).toEqual<TData[]>([
      { data: 'foo' },
    ]);
  });

  it("should add the new document using WriteBatch's set method", async () => {
    type TData = { data: string };
    const fooRef = doc(getFirestore(), 'some/other/data/foo');
    const batch = writeBatch(getFirestore());

    batch.set(fooRef, { data: 'foo' } as TData);

    expect(getMockedFirestoreCollection('some/other/data')).toEqual<TData[]>([
      { data: 'foo' },
    ]);
  });

  test('that the mocked firestore db has the data added to it', async () => {
    type TData = { data: string };
    mockFirestoreCollection<TData>('data', {
      foo: { data: 'foo' },
      bar: { data: 'bar' },
    });

    const dataRef = collection(getFirestore(), 'data');
    const response = await getDocs(dataRef);
    const data = response.docs.map((doc) => doc.data() as TData);

    expect(data).toEqual([{ data: 'foo' }, { data: 'bar' }]);
  });

  it('should get the requested doc', async () => {
    type TData = { data: string };
    mockFirestoreCollection<TData>('data', {
      foo: { data: 'foo' },
      bar: { data: 'bar' },
      foobar: { data: 'foobar' },
      baz: { data: 'baz' },
    });

    const dataRef = doc(getFirestore(), 'data/foobar');
    const response = await getDoc(dataRef);
    const data = response.data() as TData;

    expect(data).toEqual({ data: 'foobar' });
  });

  it('should still get the requested doc inside nested collections', async () => {
    type TData = { data: string };
    mockFirestoreCollection<TData>('data/meta/data', {
      foo: { data: 'foo' },
      bar: { data: 'bar' },
      foobar: { data: 'foobar' },
      baz: { data: 'baz' },
    });

    const notExistsDataRef = doc(getFirestore(), 'data/foobar');
    const dataRef = doc(getFirestore(), 'data/meta/data/foobar');
    const notExistsData = (await getDoc(notExistsDataRef)).data() as TData;
    const data = (await getDoc(dataRef)).data() as TData;

    expect(notExistsData).toBeUndefined();
    expect(data).toEqual({ data: 'foobar' });
  });

  it('should return the snapshot of a collection', () => {
    type TData = { data: string };
    mockFirestoreCollection<TData>('data', {
      foo: { data: 'foo' },
      bar: { data: 'bar' },
    });

    let data: TData[] = [];
    const dataRef = collection(getFirestore(), 'data');
    onSnapshot(dataRef, (snapshot) => {
      data = snapshot.docs.map((doc) => doc.data() as TData);
    });

    expect(data).toEqual([{ data: 'foo' }, { data: 'bar' }]);
  });
});
