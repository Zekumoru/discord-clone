import { WriteBatch, getFirestore, writeBatch } from 'firebase/firestore';

const performBatch = async (
  callback: (batch: WriteBatch) => Promise<void> | void
) => {
  const batch = writeBatch(getFirestore());
  await callback(batch);
  batch.commit();
};

export default performBatch;
