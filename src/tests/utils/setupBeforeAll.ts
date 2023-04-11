import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import testUserConfig from './testUserConfig';

vi.mock('src/contexts/current-user/hooks/useGetCurrentUser');

const setupBeforeAll = async () => {
  await signInWithEmailAndPassword(
    getAuth(),
    testUserConfig.email,
    testUserConfig.password
  );
};

export default setupBeforeAll;
