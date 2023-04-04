import { DocumentData, doc, getFirestore } from 'firebase/firestore';
import createConverter from './createConverter';

const createDoc = <T extends DocumentData>(docName: string) => {
  return doc(getFirestore(), docName).withConverter(createConverter<T>());
};

export default createDoc;
