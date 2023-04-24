import { useQuery } from 'react-query';
import userGuildsDoc from '../firebase/userGuildsDoc';
import { getDoc } from 'firebase/firestore';

const getUserGuilds = async (userGuildsId: string) => {
  const userGuildsRef = userGuildsDoc(userGuildsId);
  return (await getDoc(userGuildsRef)).data()!;
};

const useUserGuilds = (userGuildsId: string | undefined) => {
  const {
    data: userGuilds,
    isLoading,
    error,
  } = useQuery(
    ['user-guilds', userGuildsId],
    async () => await getUserGuilds(userGuildsId!),
    {
      enabled: !!userGuildsId,
    }
  );

  return [userGuilds, isLoading, error] as const;
};

export default useUserGuilds;
