import { DocumentData, FirestoreDataConverter } from 'firebase/firestore';

const getWithConverter = () => {
  let _converter: null | FirestoreDataConverter<DocumentData> = null;
  return {
    get converter() {
      return _converter;
    },
    withConverter<T extends DocumentData>(
      converter: FirestoreDataConverter<T>
    ) {
      _converter = converter;
      return this as T;
    },
  };
};

export default getWithConverter;
