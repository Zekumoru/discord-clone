import { FirebaseTestInstance } from './createTestInstance';
import { removeTestInstance } from './setup';

const teardown = async (instance: FirebaseTestInstance) => {
  await removeTestInstance(instance);
};

export default teardown;
