import { useMutation } from 'react-query';
import performBatch from '../../../../../../../../utils/performBatch';
import findUserByUsername from '../../../../../../../../types/user/firebase/findUserByUsername';
import { useCurrentUser } from '../../../../../../../../contexts/current-user/CurrentUserContext';
import IUser from '../../../../../../../../types/user/User';
import createFriendRequest from './utils/createFriendRequest';
import createDoc from '../../../../../../../../utils/firebase/createDoc';
import {
  IFriendRequest,
  IFriendRequests,
} from '../../../../../../../../types/friend/Friend';
import { getDoc } from 'firebase/firestore';
import DiscordError from '../../../../../../../../utils/DiscordError';

const alreadyHasRequest = (userId: string, requests: IFriendRequest[]) => {
  return requests.some((request) => request.userId === userId);
};

const sendFriendRequest = async (
  currentUser: IUser | undefined,
  username: string
) => {
  if (currentUser === undefined) {
    throw new Error('User is not logged in.');
  }

  await performBatch(async (batch) => {
    const otherUser = await findUserByUsername(username);

    if (otherUser === undefined) {
      throw new DiscordError(
        'user-not-found',
        `Cannot add friend! The user does not exist: ${username}`
      );
    }

    if (otherUser.id === currentUser.id) {
      throw new DiscordError(
        'action-on-self',
        `You cannot add yourself as a friend!`
      );
    }

    const currentUserFriendsRef = createDoc<IFriendRequests>(
      `friend-requests/${currentUser.friendRequestsId}`
    );
    const currentUserFriends = (await getDoc(currentUserFriendsRef)).data()!;

    const otherUserFriendsRef = createDoc<IFriendRequests>(
      `friend-requests/${otherUser.friendRequestsId}`
    );
    const otherUserFriends = (await getDoc(otherUserFriendsRef)).data()!;

    if (alreadyHasRequest(otherUser.id, currentUserFriends.requests)) {
      throw new DiscordError(
        'already-sent',
        `Cannot add friend! You already sent a friend request to this user.`
      );
    }

    await Promise.all([
      // Send friend request of pending type ACCEPTANCE on the receiving user.
      createFriendRequest(batch, {
        friendRequestsRef: otherUserFriendsRef,
        friendRequests: otherUserFriends,
        userId: currentUser.id,
        pendingType: 'acceptance',
      }),
      // Add a friend request of pending type REQUEST on the requesting user.
      createFriendRequest(batch, {
        friendRequestsRef: currentUserFriendsRef,
        friendRequests: currentUserFriends,
        userId: otherUser.id,
        pendingType: 'request',
      }),
    ]);
  });
};

type UseSendFriendRequestProps = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

const useSendFriendRequest = ({
  onSuccess,
  onError,
}: UseSendFriendRequestProps = {}) => {
  const [user] = useCurrentUser();
  return useMutation(sendFriendRequest.bind(undefined, user), {
    onSuccess,
    onError,
  });
};

export default useSendFriendRequest;
export { sendFriendRequest };
