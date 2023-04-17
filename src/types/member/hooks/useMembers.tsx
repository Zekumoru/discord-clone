import { useQuery } from 'react-query';
import membersDoc from '../firebase/membersDoc';
import { getDoc } from 'firebase/firestore';

const getMembers = async (membersId: string) => {
  const membersRef = membersDoc(membersId);
  return (await getDoc(membersRef)).data()!;
};

const useMembers = (membersId: string | undefined) => {
  const {
    data: members,
    isLoading,
    error,
  } = useQuery(
    ['members', membersId],
    async () => await getMembers(membersId!),
    {
      enabled: !!membersId,
    }
  );

  return [members, isLoading, error] as const;
};

export default useMembers;
