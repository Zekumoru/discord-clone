import { ReactNode, createContext, useContext } from 'react';
import IUser from '../../types/user/User';
import useGetCurrentUser from './hooks/useGetCurrentUser';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';

type CurrentUserTuple = [
  user: IUser | undefined,
  loading: boolean,
  error: unknown
];

const CurrentUserContext = createContext<CurrentUserTuple>(
  [] as unknown as CurrentUserTuple
);

const useCurrentUser = () => useContext(CurrentUserContext);

type CurrentUserProviderProps = {
  children: ReactNode;
};

const CurrentUserProvider = ({ children }: CurrentUserProviderProps) => {
  const [firebaseUser, firebaseLoading, firebaseError] = useAuthState(
    getAuth()
  );

  const {
    data: user,
    isLoading,
    error,
  } = useGetCurrentUser(firebaseUser?.uid ?? '');

  return (
    <CurrentUserContext.Provider
      value={[user, firebaseLoading || isLoading, firebaseError || error]}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
export { useCurrentUser };
