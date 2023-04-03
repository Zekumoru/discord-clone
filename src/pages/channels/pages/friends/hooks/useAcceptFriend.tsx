import { useMutation } from 'react-query';
import IUser from '../../../../../types/user/User';
import {
  IFriendRequest,
  IFriendRequests,
  IFriends,
} from '../../../../../types/friend/Friend';
import performBatch from '../../../../../utils/performBatch';
import userDoc from '../../../../../types/user/firebase/userDoc';
import { getDoc } from 'firebase/firestore';
import friendRequestsDoc from '../../../../../types/friend/firebase/friendRequestsDoc';
import friendsDoc from '../../../../../types/friend/firebase/friendsDoc';
import snowflakeId from '../../../../../utils/snowflake-id/snowflakeId';
import removeFriendRequests from './utils/removeFriendRequests';

type AcceptFriendArgs = {
  currentUser: IUser;
  request: IFriendRequest;
};

const acceptFriend = async ({ currentUser, request }: AcceptFriendArgs) => {
  await performBatch(async (batch) => {
    // get the other user
    const otherUser = (await getDoc(userDoc(request.userId))).data()!;

    // remove requests on both users
    await removeFriendRequests({
      batch,
      currentUser,
      otherUser,
    });

    // add as friends in both users
    const currentUserFriendsRef = friendsDoc(currentUser.friendsId);
    const otherUserFriendsRef = friendsDoc(otherUser.friendsId);

    const currentUserFriends = (await getDoc(currentUserFriendsRef)).data()!;
    const otherUserFriends = (await getDoc(otherUserFriendsRef)).data()!;

    const chatId = snowflakeId();

    batch.set<IFriends>(currentUserFriendsRef, {
      ...currentUserFriends,
      friendsList: [
        ...currentUserFriends.friendsList,
        {
          userId: otherUser.id,
          chatId,
        },
      ],
    });

    batch.set<IFriends>(otherUserFriendsRef, {
      ...otherUserFriends,
      friendsList: [
        ...otherUserFriends.friendsList,
        {
          userId: currentUser.id,
          chatId,
        },
      ],
    });
  });
};

type useAcceptFriendProps = {
  onSuccess?: () => void;
};

const useAcceptFriend = ({ onSuccess }: useAcceptFriendProps = {}) => {
  return useMutation(acceptFriend);
};

export default useAcceptFriend;
