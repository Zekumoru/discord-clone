import { useQuery } from 'react-query';
import { useCurrentUser } from '../../../contexts/current-user/CurrentUserContext';
import IUser from '../../user/User';
import { getDoc } from 'firebase/firestore';
import friendsDoc from '../firebase/friendsDoc';

const checkIfFriend = async (user: IUser, friendId: string) => {
  const userFriends = (await getDoc(friendsDoc(user.friendsId))).data()!;

  return userFriends.friendsList.some((f) => f.userId === friendId);
};

const useIsFriend = (friendId: string | undefined) => {
  const [user] = useCurrentUser();
  const {
    data: isFriend,
    isLoading,
    error,
  } = useQuery(
    ['is-friend', user?.id, friendId],
    async () => await checkIfFriend(user!, friendId!),
    {
      enabled: user && !!friendId,
    }
  );

  return [isFriend, isLoading, error] as const;
};

export default useIsFriend;
