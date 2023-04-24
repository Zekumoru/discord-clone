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
import { useCurrentUser } from '../../../../../contexts/current-user/CurrentUserContext';
import { useNavigate } from 'react-router-dom';
import { useMembersSlider } from '../../../../../contexts/members-slider/MembersSliderContext';

type GuildUpdatesListenerProps = {
  membersId: string | undefined;
};

const MembersUpdatesListener = ({ membersId }: GuildUpdatesListenerProps) => {
  const [currentUser] = useCurrentUser();
  const [_, closeMembersSlider] = useMembersSlider();
  const navigate = useNavigate();

  useEffect(() => {
    if (!membersId) return;
    if (!currentUser) return;

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

        const { members } = doc.data();
        if (!members.find((member) => member.userId === currentUser.id)) {
          toast.warn("You've been kicked from the server!");
          queryClient.invalidateQueries(['user-guilds', currentUser.guildsId]);
          closeMembersSlider();
          navigate('/channels/@me');
          return;
        }

        queryClient.invalidateQueries(['members', membersId]);
        queryClient.invalidateQueries(['members-users', membersId]);
      });
    } catch (error) {
      toast.error('An error occurred in guild listener!');
      console.error(error);
      unsubscribe();
    }

    return unsubscribe;
  }, [membersId, currentUser, closeMembersSlider]);

  return null;
};

export default MembersUpdatesListener;
