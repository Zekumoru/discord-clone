import { getDoc, setDoc } from 'firebase/firestore';
import friendRequestsDoc from '../../../../../types/friend/firebase/friendRequestsDoc';
import IUser from '../../../../../types/user/User';

const sendFriendRequest = async (user: IUser, otherUser: IUser) => {
  const userFriendRequestsRef = friendRequestsDoc(user.friendRequestsId);
  const otherUserFriendRequestsRef = friendRequestsDoc(
    otherUser.friendRequestsId
  );

  const userFriendRequests = (await getDoc(userFriendRequestsRef)).data()!;
  const otherUserFriendRequests = (
    await getDoc(otherUserFriendRequestsRef)
  ).data()!;

  await setDoc(userFriendRequestsRef, {
    ...userFriendRequests,
    requests: [
      ...userFriendRequests.requests,
      {
        pendingType: 'request',
        userId: user.id,
      },
    ],
  });

  await setDoc(otherUserFriendRequestsRef, {
    ...otherUserFriendRequests,
    requests: [
      {
        ...otherUserFriendRequests.requests,
        pendingType: 'acceptance',
        userId: otherUser.id,
      },
    ],
  });
};

export default sendFriendRequest;
