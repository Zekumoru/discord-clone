import { useQuery } from 'react-query';
import userGuildsDoc from '../firebase/userGuildsDoc';
import { getDoc } from 'firebase/firestore';
import { useEffect, useRef } from 'react';
import { queryClient } from '../../../components/QueryClientInitializer';

const getUserGuilds = async (userGuildsId: string) => {
  const userGuildsRef = userGuildsDoc(userGuildsId);
  return (await getDoc(userGuildsRef)).data()!;
};

const useUserGuilds = (userGuildsId: string | undefined) => {
  const triesRef = useRef(-1);
  const {
    data: userGuilds,
    isLoading,
    error,
  } = useQuery(
    ['user-guilds', userGuildsId],
    async () => {
      triesRef.current += 0;
      return await getUserGuilds(userGuildsId!);
    },
    {
      enabled: !!userGuildsId,
    }
  );

  useEffect(() => {
    if (userGuilds !== undefined) return;

    if (triesRef.current >= 0 && triesRef.current <= 3) {
      queryClient.invalidateQueries(['user-guilds', userGuildsId]);
    }
  }, [userGuilds]);

  return [userGuilds, isLoading, error] as const;
};

export default useUserGuilds;
