import { useMutation } from 'react-query';
import IUser from '../../../../../types/user/User';
import { IFriendRequest } from '../../../../../types/friend/Friend';
import performBatch from '../../../../../utils/performBatch';
import { getDoc } from 'firebase/firestore';
import userDoc from '../../../../../types/user/firebase/userDoc';
import removeFriendRequests from './utils/removeFriendRequests';

type RejectFriendArgs = {
  currentUser: IUser;
  request: IFriendRequest;
};

const rejectFriend = async ({ currentUser, request }: RejectFriendArgs) => {
  await performBatch(async (batch) => {
    // get the other user
    const otherUser = (await getDoc(userDoc(request.userId))).data()!;

    // remove requests on both users
    await removeFriendRequests({
      batch,
      currentUser,
      otherUser,
    });
  });
};

type useRejectFriendProps = {
  onSuccess?: () => void;
};

const useRejectFriend = ({ onSuccess }: useRejectFriendProps = {}) => {
  return useMutation(rejectFriend);
};

export default useRejectFriend;
