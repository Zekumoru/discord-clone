import { collection, getDocs, getFirestore } from 'firebase/firestore';
import createConverter from '../../../../utils/firebase/createConverter';
import mockGetDocsData, { mockCollectionData } from '../mockGetDocsData';
import createCollection from '../../../../utils/firebase/createCollection';

vi.mock('firebase/firestore');

describe('Tests/mockGetDocsData', () => {
  it('should return the proper data', async () => {
    type Foo = { foo: string };
    type Bar = { bar: string };
    const foosRef = createCollection<Foo>('foos');
    const barsRef = createCollection<Bar>('bars');
    const mcd = mockCollectionData;
    mockGetDocsData({
      foos: mcd<Foo>({ foo: 'A' }, { foo: 'B' }, { foo: 'C' }),
      bars: mcd<Bar>({ bar: 'A' }, { bar: 'B' }, { bar: 'C' }),
    });

    const foo = (await getDocs<Foo>(foosRef)).docs.map((doc) => doc.data());
    const bar = (await getDocs<Bar>(barsRef)).docs.map((doc) => doc.data());

    expect(foo).toEqual<Foo[]>([{ foo: 'A' }, { foo: 'B' }, { foo: 'C' }]);
    expect(bar).toEqual<Bar[]>([{ bar: 'A' }, { bar: 'B' }, { bar: 'C' }]);
  });

  it('should return an empty docs array if the data has not been mocked', async () => {
    type Foo = { foo: string };
    const foosRef = createCollection<Foo>('foos');
    mockGetDocsData();

    const foo = (await getDocs<Foo>(foosRef)).docs.map((doc) => doc.data());

    expect(foo).toEqual([]);
  });
});
