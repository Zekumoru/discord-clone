import { useMutation } from 'react-query';
import performBatch from '../../../../../../utils/performBatch';
import findUserByUsername from '../../../../../../types/user/firebase/findUserByUsername';
import { useCurrentUser } from '../../../../../../contexts/current-user/CurrentUserContext';
import IUser from '../../../../../../types/user/User';
import createFriendRequest from './utils/createFriendRequest';

const addFriend = async (currentUser: IUser | undefined, username: string) => {
  if (currentUser === undefined) {
    throw new Error('User is not logged in.');
  }

  await performBatch(async (batch) => {
    const userToAdd = await findUserByUsername(username);

    if (userToAdd === undefined) {
      throw new Error(
        `Cannot add friend! The user does not exist: ${username}`
      );
    }

    if (userToAdd.id === currentUser.id) {
      throw new Error(`You cannot add yourself as a friend!`);
    }

    await Promise.all([
      // Send friend request of pending type ACCEPTANCE on the receiving user.
      createFriendRequest(batch, {
        requestsId: userToAdd.friendRequestsId,
        userId: currentUser.id,
        pendingType: 'acceptance',
      }),
      // Add a friend request of pending type REQUEST on the requesting user.
      createFriendRequest(batch, {
        requestsId: currentUser.friendRequestsId,
        userId: userToAdd.id,
        pendingType: 'request',
      }),
    ]);
  });
};

type UseAddFriendProps = {
  onSuccess?: () => void;
};

const useAddFriend = ({ onSuccess }: UseAddFriendProps = {}) => {
  const [user] = useCurrentUser();

  return useMutation(addFriend.bind(undefined, user), {
    onSuccess,
  });
};

export default useAddFriend;
