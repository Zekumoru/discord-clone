import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import testUserConfig from './testUserConfig';

const setupBeforeAll = async () => {
  await signInWithEmailAndPassword(
    getAuth(),
    testUserConfig.email,
    testUserConfig.password
  );
};

export default setupBeforeAll;
