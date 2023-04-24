import { useQuery } from 'react-query';
import IUser from '../../../types/user/User';
import IGuild from '../../../types/guild/Guild';
import { getDoc } from 'firebase/firestore';
import friendsDoc from '../../../types/friend/firebase/friendsDoc';
import membersDoc from '../../../types/member/firebase/membersDoc';
import { queryClient } from '../../QueryClientInitializer';
import userDoc from '../../../types/user/firebase/userDoc';

const getInvitableFriends = async (user: IUser, guild: IGuild) => {
  const { friendsList: friends } = (
    await getDoc(friendsDoc(user.friendsId))
  ).data()!;
  const { members } = (await getDoc(membersDoc(guild.membersId))).data()!;
  const membersMap = new Map<string, string>();

  members.forEach((member) => membersMap.set(member.userId, member.userId));

  return await Promise.all(
    friends
      .filter(({ userId: friendId }) => friendId !== membersMap.get(friendId))
      .map(async ({ userId: friendId }) => {
        const friend = queryClient.getQueryData<IUser>(['user', friendId]);
        if (friend) return friend;

        const friendRef = userDoc(friendId);
        return (await getDoc(friendRef)).data()!;
      })
  );
};

const useInvitableFriends = (
  user: IUser | undefined,
  guild: IGuild | undefined
) => {
  const {
    data: invitableFriends,
    isLoading,
    error,
  } = useQuery(
    ['invitable-friends', guild?.id, user?.id],
    async () => await getInvitableFriends(user!, guild!),
    {
      enabled: !!user && !!guild,
    }
  );

  return [invitableFriends, isLoading, error] as const;
};

export default useInvitableFriends;
