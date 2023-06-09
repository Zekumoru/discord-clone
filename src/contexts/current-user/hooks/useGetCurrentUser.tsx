import { useQuery } from 'react-query';
import findUserByFirebaseId from '../../../types/user/firebase/findUserByFirebaseId';

const getCurrentUser = async (firebaseId: string) => {
  return await findUserByFirebaseId(firebaseId);
};

const useGetCurrentUser = (firebaseId: string) => {
  return useQuery(
    ['user', 'current', firebaseId],
    async () => await getCurrentUser(firebaseId),
    {
      enabled: !!firebaseId,
    }
  );
};

export default useGetCurrentUser;
