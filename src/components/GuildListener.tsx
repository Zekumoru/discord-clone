import {
  Unsubscribe,
  limit,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import guildLogsCollection from '../types/guild-log/firebase/guildLogsCollection';
import { compareAsc, format } from 'date-fns';
import TGuildLog from '../types/guild-log/GuildLog';
import { useCurrentUser } from '../contexts/current-user/CurrentUserContext';
import { queryClient } from './QueryClientInitializer';
import { useNavigate } from 'react-router-dom';
import useGuild from '../types/guild/hooks/useGuild';
import { useMembersSlider } from '../contexts/members-slider/MembersSliderContext';

type GuildListenerProps = {
  guildId: string | undefined;
};

const GuildListener = ({ guildId }: GuildListenerProps) => {
  const [currentUser] = useCurrentUser();
  const [guild] = useGuild(guildId);
  const [_, closeMembersSlider] = useMembersSlider();
  const navigate = useNavigate();

  const handleOwnershipChange = (log: TGuildLog) => {
    if (log.event.type !== 'ownership-transferred') return;
    if (currentUser === undefined || guildId === undefined) return;

    if (currentUser.id === log.event.newOwnerId) {
      toast(`You are now the server owner!`);
      queryClient.invalidateQueries(['guild-owner-id', guildId]);
    }
  };

  const handleGuildDelete = (log: TGuildLog) => {
    if (log.event.type !== 'server-deleted') return;

    toast.warn(`This server has been deleted!`);
    queryClient.invalidateQueries(['user-guilds']);
    navigate('/channels/@me');
  };

  const handleMembersUpdates = (log: TGuildLog) => {
    if (log.type !== 'member') return;
    if (!guild || !currentUser) return;

    if (
      log.event.type === 'user-kicked' &&
      currentUser.id === log.event.userId
    ) {
      toast.warn("You've been kicked from the server!");
      queryClient.invalidateQueries(['user-guilds', currentUser.guildsId]);
      closeMembersSlider();
      navigate('/channels/@me');
      return;
    }

    queryClient.invalidateQueries(['members', guild.membersId]);
    queryClient.invalidateQueries(['members-users', guild.membersId]);
  };

  useEffect(() => {
    if (!guildId) return;
    if (!guild) return;

    const initializedDatetime = new Date();
    let unsubscribe: Unsubscribe = () => {};

    try {
      const guildsLogsQuery = query(
        guildLogsCollection(guildId),
        orderBy('timestamp', 'desc'),
        limit(1)
      );

      unsubscribe = onSnapshot(guildsLogsQuery, (snapshot) => {
        snapshot.docChanges().forEach(({ type, doc }) => {
          const log = doc.data();
          if (
            !(
              type === 'modified' ||
              (type === 'added' && log.timestamp !== null)
            )
          ) {
            return;
          }

          const timestamp = log.timestamp!;
          if (compareAsc(initializedDatetime, timestamp.toDate()) > 0) return;

          handleOwnershipChange(log);
          handleGuildDelete(log);
          handleMembersUpdates(log);
        });
      });
    } catch (error) {
      toast.error('An error occurred in guild listener!');
      console.error(error);
      unsubscribe();
    }

    return unsubscribe;
  }, [guildId, guild]);

  return null;
};

export default GuildListener;
