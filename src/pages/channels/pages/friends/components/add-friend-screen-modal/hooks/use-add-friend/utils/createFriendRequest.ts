import { DocumentReference, WriteBatch, getDoc } from 'firebase/firestore';
import {
  IFriendRequest,
  IFriendRequests,
} from '../../../../../../../../../types/friend/Friend';

type CreateFriendRequestOptions = {
  friendRequestsRef: DocumentReference<IFriendRequests>;
  friendRequests: IFriendRequests;
} & Pick<IFriendRequest, 'userId' | 'pendingType'>;

const createFriendRequest = async (
  batch: WriteBatch,
  {
    friendRequestsRef,
    friendRequests,
    userId,
    pendingType,
  }: CreateFriendRequestOptions
) => {
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
