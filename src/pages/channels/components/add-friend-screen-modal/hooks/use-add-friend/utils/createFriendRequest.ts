import { WriteBatch, getDoc } from 'firebase/firestore';
import {
  IFriendRequest,
  IFriendRequests,
} from '../../../../../../../types/friend/Friend';
import createDoc from '../../../../../../../utils/firebase/createDoc';

type CreateFriendRequestOptions = {
  requestsId: string;
} & Pick<IFriendRequest, 'userId' | 'pendingType'>;

const createFriendRequest = async (
  batch: WriteBatch,
  { requestsId, userId, pendingType }: CreateFriendRequestOptions
) => {
  const friendRequestsRef = createDoc<IFriendRequests>(
    `friend-requests/${requestsId}`
  );
  const friendRequests = (await getDoc(friendRequestsRef)).data()!;
  batch.set<IFriendRequests>(friendRequestsRef, {
    ...friendRequests,
    requests: [
      ...friendRequests.requests,
      {
        userId,
        pendingType,
      },
    ],
  });
};

export default createFriendRequest;
export type { CreateFriendRequestOptions };
