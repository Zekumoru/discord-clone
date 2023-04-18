import { getDocs, limit, query, where } from 'firebase/firestore';
import { useQuery } from 'react-query';
import invitesCollection from '../firebase/invitesCollection';

const getInviteFromGuildId = async (guildId: string) => {
  const inviteQuery = query(
    invitesCollection,
    where('guildId', '==', guildId),
    limit(1)
  );

  const foundInvites = (await getDocs(inviteQuery)).docs;
  if (foundInvites.length === 0) return undefined;

  return foundInvites[0].data();
};

const useInviteFromGuildId = (guildId: string | undefined) => {
  const {
    data: invite,
    isLoading,
    error,
  } = useQuery(
    ['invite', guildId],
    async () => await getInviteFromGuildId(guildId!),
    {
      enabled: !!guildId,
    }
  );

  return [invite, isLoading, error] as const;
};

export default useInviteFromGuildId;
