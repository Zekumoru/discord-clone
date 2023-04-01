import { DocumentData, collection, getFirestore } from 'firebase/firestore';
import createConverter from './createConverter';

const createCollection = <T extends DocumentData>(collectionName: string) => {
  return collection(getFirestore(), collectionName).withConverter(
    createConverter<T>()
  );
};

export default createCollection;
