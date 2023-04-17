import { useQuery } from 'react-query';
import guildDoc from '../firebase/guildDoc';
import { getDoc } from 'firebase/firestore';

const getGuild = async (guildId: string) => {
  const guildRef = guildDoc(guildId);
  return (await getDoc(guildRef)).data()!;
};

const useGuild = (guildId: string | undefined) => {
  const {
    data: guild,
    isLoading,
    error,
  } = useQuery(['guild', guildId], async () => await getGuild(guildId!), {
    enabled: !!guildId,
  });

  return [guild, isLoading, error] as const;
};

export default useGuild;
