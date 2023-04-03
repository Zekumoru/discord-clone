import { WriteBatch, getDoc } from 'firebase/firestore';
import friendRequestsDoc from '../../../../../../types/friend/firebase/friendRequestsDoc';
import IUser from '../../../../../../types/user/User';
import { IFriendRequests } from '../../../../../../types/friend/Friend';

type RemoveFriendRequestsArgs = {
  currentUser: IUser;
  otherUser: IUser;
  batch: WriteBatch;
};

const removeFriendRequests = async ({
  batch,
  currentUser,
  otherUser,
}: RemoveFriendRequestsArgs) => {
  const currentUserRequestsRef = friendRequestsDoc(
    currentUser.friendRequestsId
  );
  const otherUserRequestsRef = friendRequestsDoc(otherUser.friendRequestsId);

  const currentUserRequests = (await getDoc(currentUserRequestsRef)).data()!;
  const otherUserRequests = (await getDoc(otherUserRequestsRef)).data()!;

  batch.set<IFriendRequests>(currentUserRequestsRef, {
    ...currentUserRequests,
    requests: currentUserRequests.requests.filter(
      (req) => req.userId !== otherUser.id
    ),
  });

  batch.set<IFriendRequests>(otherUserRequestsRef, {
    ...otherUserRequests,
    requests: otherUserRequests.requests.filter(
      (req) => req.userId !== currentUser.id
    ),
  });
};

export default removeFriendRequests;
