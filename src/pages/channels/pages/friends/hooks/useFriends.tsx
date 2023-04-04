import friendsDoc from '../../../../../types/friend/firebase/friendsDoc';
import { Unsubscribe, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { IFriends } from '../../../../../types/friend/Friend';

const useFriends = (friendsId: string | undefined) => {
  const [friends, setFriends] = useState<IFriends>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    if (!friendsId) return;

    const friendsRef = friendsDoc(friendsId);
    let unsubscribe: Unsubscribe = () => {};

    try {
      unsubscribe = onSnapshot(friendsRef, (snapshot) => {
        setFriends(snapshot.data());
        setIsLoading(false);
      });
    } catch (error) {
      unsubscribe();
      setError(error);
    }

    return () => unsubscribe();
  }, [friendsId]);

  return [friends, isLoading, error] as const;
};

export default useFriends;
