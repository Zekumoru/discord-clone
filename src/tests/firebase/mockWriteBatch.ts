import { WriteBatch, writeBatch } from 'firebase/firestore';

const mockWriteBatch = () => {
  const setFn = vi.fn();
  const updateFn = vi.fn();
  const deleteFn = vi.fn();
  const commitFn = vi.fn();

  vi.mocked(writeBatch).mockReturnValue({
    set: setFn,
    update: updateFn,
    delete: deleteFn,
    commit: commitFn,
  } as unknown as WriteBatch);

  return { set: setFn, update: updateFn, delete: deleteFn, commit: commitFn };
};

export default mockWriteBatch;
