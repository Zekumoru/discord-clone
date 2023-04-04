import { FirestoreDataConverter } from 'firebase/firestore';

const createConverter = <T extends object>() => {
  const converter: FirestoreDataConverter<T> = {
    toFirestore: (data) => data,
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options) as T;
      return data;
    },
  };

  return converter;
};

export default createConverter;
