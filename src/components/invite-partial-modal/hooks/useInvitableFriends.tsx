import { useQuery } from 'react-query';
import IUser from '../../../types/user/User';
import IGuild from '../../../types/guild/Guild';
import { getDoc } from 'firebase/firestore';
import friendsDoc from '../../../types/friend/firebase/friendsDoc';
import membersDoc from '../../../types/member/firebase/membersDoc';

const getInvitableFriends = async (user: IUser, guild: IGuild) => {
  const { friendsList: friends } = (
    await getDoc(friendsDoc(user.friendsId))
  ).data()!;
  const { members } = (await getDoc(membersDoc(guild.membersId))).data()!;
  const membersMap = new Map<string, string>();

  members.forEach((member) => membersMap.set(member.userId, member.userId));

  return friends.filter(
    ({ userId: friendId }) => friendId !== membersMap.get(friendId)
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
