import { useEffect } from 'react';
import {
  limit,
  onSnapshot,
  query,
  Unsubscribe,
  where,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import membersCollection from '../../../../../types/member/firebase/membersCollection';
import { queryClient } from '../../../../../components/QueryClientInitializer';

type GuildUpdatesListenerProps = {
  membersId: string | undefined;
};

const MembersUpdatesListener = ({ membersId }: GuildUpdatesListenerProps) => {
  useEffect(() => {
    if (!membersId) return;

    let unsubscribe: Unsubscribe = () => {};

    try {
      const membersQuery = query(
        membersCollection,
        where('id', '==', membersId),
        limit(1)
      );
      unsubscribe = onSnapshot(membersQuery, (snapshot) => {
        const { type, doc } = snapshot.docChanges()[0];
        if (type !== 'modified') return;

        queryClient.invalidateQueries(['members', membersId]);
      });
    } catch (error) {
      toast.error('An error occurred in guild listener!');
      console.error(error);
      unsubscribe();
    }

    return unsubscribe;
  }, [membersId]);

  return null;
};

export default MembersUpdatesListener;
