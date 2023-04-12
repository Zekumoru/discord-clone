import { useMutation } from 'react-query';
import IUser from '../../../../../types/user/User';
import { IFriendRequest } from '../../../../../types/friend/Friend';
import { getDoc } from 'firebase/firestore';
import userDoc from '../../../../../types/user/firebase/userDoc';
import friendRequestsDoc from '../../../../../types/friend/firebase/friendRequestsDoc';
import performBatch from '../../../../../utils/performBatch';

type RemoveFriendRequestProps = {
  currentUser: IUser;
  request: IFriendRequest;
};

const removeFriendRequest = async ({
  currentUser,
  request,
}: RemoveFriendRequestProps) => {
  const otherUser = (await getDoc(userDoc(request.userId))).data()!;

  const currentUserRequestsRef = friendRequestsDoc(
    currentUser.friendRequestsId
  );
  const otherUserRequestsRef = friendRequestsDoc(otherUser.friendRequestsId);
  const [currentUserRequests, otherUserRequests] = (
    await Promise.all([
      getDoc(currentUserRequestsRef),
      getDoc(otherUserRequestsRef),
    ])
  ).map((d) => d.data()!);

  await performBatch((batch) => {
    batch.set(currentUserRequestsRef, {
      ...currentUserRequests,
      requests: currentUserRequests.requests.filter(
        (request) => request.userId !== otherUser.id
      ),
    });

    batch.set(otherUserRequestsRef, {
      ...otherUserRequests,
      requests: otherUserRequests.requests.filter(
        (request) => request.userId !== currentUser.id
      ),
    });
  });
};

const useRemoveFriendRequest = () => {
  return useMutation(removeFriendRequest);
};

export default useRemoveFriendRequest;
