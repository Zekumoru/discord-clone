import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
} from 'firebase/firestore';
import mockFirestoreCollection, {
  mockResetFirestoreCollection,
} from '../utils/mockFirestoreCollection';
import { vi } from 'vitest';

vi.mock('firebase/firestore');

describe('mockFirestoreCollection', () => {
  afterEach(() => {
    mockResetFirestoreCollection();
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
