import { useQuery } from 'react-query';
import inviteDoc from '../firebase/inviteDoc';
import { getDoc } from 'firebase/firestore';

const getInvite = async (inviteId: string) => {
  const inviteRef = inviteDoc(inviteId);

  return (await getDoc(inviteRef)).data()!;
};

const useInvite = (inviteId: string | undefined) => {
  const {
    data: invite,
    isLoading,
    error,
  } = useQuery(['invite', inviteId], async () => await getInvite(inviteId!), {
    enabled: !!inviteId,
  });

  return [invite, isLoading, error] as const;
};

export default useInvite;
