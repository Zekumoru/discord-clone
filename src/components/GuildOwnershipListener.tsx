import { useEffect } from 'react';
import { useCurrentUser } from '../contexts/current-user/CurrentUserContext';
import {
  Unsubscribe,
  limit,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import membersCollection from '../types/member/firebase/membersCollection';
import { toast } from 'react-toastify';
import useRoles from '../types/role/hooks/useRoles';
import useGuild from '../types/guild/hooks/useGuild';
import useMembers from '../types/member/hooks/useMembers';
import { queryClient } from './QueryClientInitializer';

type GuildOwnershipListenerProps = {
  guildId: string | undefined;
};

const GuildOwnershipListener = ({ guildId }: GuildOwnershipListenerProps) => {
  const [currentUser] = useCurrentUser();
  const [guild] = useGuild(guildId);
  const [members] = useMembers(guild?.membersId);
  const [roles] = useRoles(guild?.rolesId);

  useEffect(() => {
    if (!currentUser) return;
    if (!guild) return;
    if (!members) return;
    if (!roles) return;

    const ownerRoleId = roles.roles.find((role) => role.name === 'owner')?.id;
    if (!ownerRoleId) {
      toast.error('Missing owner role in ownership listener!');
      return;
    }

    const previousRoleId = members.members.find(
      (member) => member.userId === currentUser.id
    )?.roleId;
    if (!previousRoleId) {
      toast.error('Missing current user in ownership listener!');
      return;
    }

    let unsubscribe: Unsubscribe = () => {};

    try {
      const membersQuery = query(
        membersCollection,
        where('id', '==', guild.membersId),
        limit(1)
      );
      unsubscribe = onSnapshot(membersQuery, async (snapshot) => {
        const { type, doc } = snapshot.docChanges()[0];
        if (type !== 'modified') return;

        const members = doc.data();
        const member = members.members.find(
          (member) => member.userId === currentUser.id
        );

        if (!member) return;
        if (member.roleId === ownerRoleId && previousRoleId !== ownerRoleId) {
          await queryClient.invalidateQueries(['guild-owner-id', guild.id]);
          toast(`You are now the server owner!`);
        }
      });
    } catch (error) {
      toast.error('An error occurred in ownership listener!');
      console.error(error);
      unsubscribe();
    }

    return unsubscribe;
  }, [currentUser, guild, members, roles]);

  return null;
};

export default GuildOwnershipListener;
