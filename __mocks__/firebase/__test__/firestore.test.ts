import { vi } from 'vitest';
import { collection, doc, getFirestore } from 'firebase/firestore';
import FirebaseError from '../utils/FirebaseError';

vi.mock('firebase/firestore');

describe('firestore', () => {
  it('should build the correct path with doc', () => {
    const fooRef = doc(getFirestore(), 'some/other/data/foo');
    const barRef = doc(getFirestore(), 'some', 'other', 'data', 'bar');
    const bazRef = doc(getFirestore(), 'some/other/data', 'baz');

    expect(fooRef.path).toBe('some/other/data/foo');
    expect(barRef.path).toBe('some/other/data/bar');
    expect(bazRef.path).toBe('some/other/data/baz');
  });

  it('should build the correct path with collection', () => {
    const fooRef = collection(getFirestore(), 'some/data/foo');
    const barRef = collection(getFirestore(), 'some', 'data', 'bar');
    const bazRef = collection(getFirestore(), 'some/data', 'baz');

    expect(fooRef.path).toBe('some/data/foo');
    expect(barRef.path).toBe('some/data/bar');
    expect(bazRef.path).toBe('some/data/baz');
  });

  it('should throw an error if doc has an odd number of segments', async () => {
    expect(() => {
      doc(getFirestore(), 'data');
    }).toThrowError(FirebaseError);
  });

  it('should throw an error if collection has an even number of segments', async () => {
    expect(() => {
      collection(getFirestore(), 'data/sample');
    }).toThrowError(FirebaseError);
  });
});
