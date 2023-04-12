import { useQuery } from 'react-query';
import IUser from '../../user/User';
import { getDoc } from 'firebase/firestore';
import friendRequestsDoc from '../firebase/friendRequestsDoc';

const getFriendRequest = async (user: IUser, otherUserId: string) => {
  const userRequests = (
    await getDoc(friendRequestsDoc(user.friendRequestsId))
  ).data()!;

  return userRequests.requests.find(
    (request) => request.userId === otherUserId
  );
};

const useFriendRequest = (
  user: IUser | undefined,
  otherUserId: string | undefined
) => {
  const {
    data: friendRequest,
    isLoading,
    error,
  } = useQuery(
    ['friend-request', user!.id, otherUserId],
    async () => await getFriendRequest(user!, otherUserId!),
    {
      enabled: !!user && !!otherUserId,
    }
  );

  return [friendRequest, isLoading, error] as const;
};

export default useFriendRequest;
