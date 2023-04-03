import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from 'firebase/firestore';
import createConverter from '../../../../utils/firebase/createConverter';
import mockGetDocsData, { mockCollectionData } from '../mockGetDocsData';
import createDoc from '../../../../utils/firebase/createDoc';
import mockGetDocData, { mockDocumentData } from '../mockGetDocData';

vi.mock('firebase/firestore');

describe('Tests/mockGetDocData', () => {
  it('should return the proper data', async () => {
    type Foo = { foo: string };
    type Bar = { bar: string };
    const fooRef = createDoc<Foo>('tests/foo');
    const barRef = createDoc<Bar>('tests/bar');
    const mdd = mockDocumentData;
    mockGetDocData({
      'tests/foo': mdd<Foo>({ foo: 'A' }),
      'tests/bar': mdd<Bar>({ bar: 'A' }),
    });

    const foo = (await getDoc<Foo>(fooRef)).data();
    const bar = (await getDoc<Bar>(barRef)).data();

    expect(foo).toEqual<Foo>({ foo: 'A' });
    expect(bar).toEqual<Bar>({ bar: 'A' });
  });

  it('should return an empty doc object if the data has not been mocked', async () => {
    type Foo = { foo: string };
    const fooRef = createDoc<Foo>('tests/foo');
    mockGetDocData();

    const foo = (await getDoc<Foo>(fooRef)).data();

    expect(foo).toEqual({});
  });
});
