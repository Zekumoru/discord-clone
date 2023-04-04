import { getDoc } from 'firebase/firestore';
import { useQuery } from 'react-query';
import userDoc from '../firebase/userDoc';

const getUser = async (userId: string | undefined) => {
  if (!userId) return;

  const response = await getDoc(userDoc(userId));
  return response.data();
};

const useUser = (userId: string | undefined) => {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery(['user', userId], async () => await getUser(userId), {
    enabled: !!userId,
    refetchOnWindowFocus: false,
  });

  return [user, isLoading, error] as const;
};

export default useUser;
