import { useMutation } from 'react-query';
import IUser from '../../../types/user/User';
import friendsDoc from '../../../types/friend/firebase/friendsDoc';
import { getDoc, setDoc } from 'firebase/firestore';

type RemoveFriendProps = {
  currentUser: IUser;
  friendToRemove: IUser;
};

const removeFriend = async ({
  currentUser,
  friendToRemove,
}: RemoveFriendProps) => {
  if (currentUser.id === friendToRemove.id) {
    throw new Error(
      'You cannot remove yourself as a friend! How did you even manage to pull this trick off??'
    );
  }

  const currentUserFriendsRef = friendsDoc(currentUser.friendsId);
  const friendToRemoveFriendsRef = friendsDoc(friendToRemove.friendsId);

  const [currenUserFriends, friendToRemoveFriends] = (
    await Promise.all([
      getDoc(currentUserFriendsRef),
      getDoc(friendToRemoveFriendsRef),
    ])
  ).map((d) => d.data()!);

  setDoc(currentUserFriendsRef, {
    ...currenUserFriends,
    friendsList: currenUserFriends.friendsList.filter(
      (friend) => friend.userId !== friendToRemove.id
    ),
  });
  setDoc(friendToRemoveFriendsRef, {
    ...friendToRemoveFriends,
    friendsList: friendToRemoveFriends.friendsList.filter(
      (friend) => friend.userId !== currentUser.id
    ),
  });
};

type UseRemoveFriendProps = {
  onSuccess?: () => void;
};

const useRemoveFriend = ({ onSuccess }: UseRemoveFriendProps = {}) => {
  return useMutation(removeFriend, {
    onSuccess,
  });
};

export default useRemoveFriend;
