import { useMutation } from 'react-query';
import performBatch from '../../../../../../utils/performBatch';
import findUserByUsername from '../../../../../../types/user/firebase/findUserByUsername';
import { useCurrentUser } from '../../../../../../contexts/current-user/CurrentUserContext';
import IUser from '../../../../../../types/user/User';
import createFriendRequest from './utils/createFriendRequest';
import createDoc from '../../../../../../utils/firebase/createDoc';
import {
  IFriendRequest,
  IFriendRequests,
} from '../../../../../../types/friend/Friend';
import { getDoc } from 'firebase/firestore';

const alreadyHasRequest = (userId: string, requests: IFriendRequest[]) => {
  return requests.some((request) => request.userId === userId);
};

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

    const currentUserFriendsRef = createDoc<IFriendRequests>(
      `friend-requests/${currentUser.friendRequestsId}`
    );
    const currentUserFriends = (await getDoc(currentUserFriendsRef)).data()!;

    const userToAddFriendsRef = createDoc<IFriendRequests>(
      `friend-requests/${userToAdd.friendRequestsId}`
    );
    const userToAddFriends = (await getDoc(userToAddFriendsRef)).data()!;

    if (alreadyHasRequest(userToAdd.id, currentUserFriends.requests)) {
      throw new Error(
        `Cannot add friend! You already sent a friend request to this user.`
      );
    }

    await Promise.all([
      // Send friend request of pending type ACCEPTANCE on the receiving user.
      createFriendRequest(batch, {
        friendRequestsRef: userToAddFriendsRef,
        friendRequests: userToAddFriends,
        userId: currentUser.id,
        pendingType: 'acceptance',
      }),
      // Add a friend request of pending type REQUEST on the requesting user.
      createFriendRequest(batch, {
        friendRequestsRef: currentUserFriendsRef,
        friendRequests: currentUserFriends,
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
