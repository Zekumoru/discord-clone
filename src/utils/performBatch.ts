import { WriteBatch, getFirestore, writeBatch } from 'firebase/firestore';

const performBatch = async <T extends unknown>(
  callback: (batch: WriteBatch) => Promise<T> | T
): Promise<T> => {
  const batch = writeBatch(getFirestore());
  const result = await callback(batch);
  batch.commit();
  return result;
};

export default performBatch;
