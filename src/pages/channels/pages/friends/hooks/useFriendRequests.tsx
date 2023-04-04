import { useEffect, useState } from 'react';
import { IFriendRequests } from '../../../../../types/friend/Friend';
import { Unsubscribe } from 'firebase/auth';
import { onSnapshot } from 'firebase/firestore';
import friendRequestsDoc from '../../../../../types/friend/firebase/friendRequestsDoc';

const useFriendRequests = (friendRequestsId: string | undefined) => {
  const [friendRequests, setFriendRequests] = useState<IFriendRequests>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    if (!friendRequestsId) return;

    const friendRequestsRef = friendRequestsDoc(friendRequestsId);
    let unsubscribe: Unsubscribe = () => {};

    try {
      unsubscribe = onSnapshot(friendRequestsRef, (snapshot) => {
        setFriendRequests(snapshot.data());
        setIsLoading(false);
      });
    } catch (error) {
      unsubscribe();
      setError(error);
    }

    return () => unsubscribe();
  }, [friendRequestsId]);

  return [friendRequests, isLoading, error] as const;
};

export default useFriendRequests;
