import { useQuery } from 'react-query';
import findUserByFirebaseId from '../../../types/user/firebase/findUserByFirebaseId';

const getCurrentUser = async (firebaseId: string) => {
  return findUserByFirebaseId(firebaseId);
};

const useGetCurrentUser = (firebaseId: string) => {
  return useQuery('currentUser', async () => await getCurrentUser(firebaseId), {
    enabled: !!firebaseId,
    refetchOnWindowFocus: false,
  });
};

export default useGetCurrentUser;
