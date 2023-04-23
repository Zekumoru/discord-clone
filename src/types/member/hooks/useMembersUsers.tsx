import { getDoc } from 'firebase/firestore';
import { useQuery } from 'react-query';
import membersDoc from '../firebase/membersDoc';
import { queryClient } from '../../../components/QueryClientInitializer';
import IUser from '../../user/User';
import userDoc from '../../user/firebase/userDoc';

const getMembersUsers = async (membersId: string) => {
  const { members } = (await getDoc(membersDoc(membersId))).data()!;

  return await Promise.all(
    members.map(async ({ userId }) => {
      const user = queryClient.getQueryData<IUser>(['user', userId]);
      if (user) return user;

      const userRef = userDoc(userId);
      return (await getDoc(userRef)).data()!;
    })
  );
};

const useMembersUsers = (membersId: string | undefined) => {
  const {
    data: membersUsers,
    isLoading,
    error,
  } = useQuery(
    ['members-users', membersId],
    async () => await getMembersUsers(membersId!),
    {
      enabled: !!membersId,
    }
  );

  return [membersUsers, isLoading, error] as const;
};

export default useMembersUsers;
