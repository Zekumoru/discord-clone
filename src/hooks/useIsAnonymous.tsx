import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const useIsAnonymous = () => {
  const [firebaseUser] = useAuthState(getAuth());

  return firebaseUser?.isAnonymous;
};

export default useIsAnonymous;
