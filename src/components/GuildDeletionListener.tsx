import {
  Unsubscribe,
  limit,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { useEffect } from 'react';
import guildsCollection from '../types/guild/firebase/guildsCollection';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { queryClient } from './QueryClientInitializer';

type GuildDeletionListenerProps = {
  guildId: string | undefined;
};

const GuildDeletionListener = ({ guildId }: GuildDeletionListenerProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!guildId) return;

    let unsubscribe: Unsubscribe = () => {};

    try {
      const guildsQuery = query(
        guildsCollection,
        where('id', '==', guildId),
        limit(1)
      );
      unsubscribe = onSnapshot(guildsQuery, (snapshot) => {
        const { type, doc } = snapshot.docChanges()[0];
        if (type !== 'removed') return;

        const guild = doc.data();
        toast.warn(`${guild.name} has been deleted!`);
        queryClient.invalidateQueries(['user-guilds']);
        navigate('/channels/@me');
      });
    } catch (error) {
      toast.error('An error occurred in guild listener!');
      console.error(error);
      unsubscribe();
    }

    return unsubscribe;
  }, [guildId]);

  return null;
};

export default GuildDeletionListener;
