import '@test-utils/initialize';
import testUserConfig from '@test-utils/testUserConfig';
import {
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
} from 'firebase/auth';

const clearFirestore = async () => {
  await fetch(
    'http://localhost:3174/emulator/v1/projects/discord-clone-zekumoru/databases/(default)/documents',
    {
      method: 'DELETE',
    }
  );
};

export const setup = async () => {
  console.log('Running global setup');
  await createUserWithEmailAndPassword(
    getAuth(),
    testUserConfig.email,
    testUserConfig.password
  );
};

export const teardown = async () => {
  console.log('Running global teardown');

  const user = getAuth().currentUser;
  if (user === null) {
    throw new Error(
      'Unable to delete test user. Is it perhaps not created at global setup or has it been deleted in one of the test cases?'
    );
  }

  await deleteUser(user);
  await clearFirestore();
};
