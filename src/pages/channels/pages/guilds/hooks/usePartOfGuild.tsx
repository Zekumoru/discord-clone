import { useEffect, useState } from 'react';
import { useCurrentUser } from '../../../../../contexts/current-user/CurrentUserContext';
import useGuild from '../../../../../types/guild/hooks/useGuild';
import useMembers from '../../../../../types/member/hooks/useMembers';

const usePartOfGuild = (guildId: string | undefined) => {
  const [currentUser, currentUserLoading] = useCurrentUser();
  const [guild, guildLoading] = useGuild(guildId);
  const [members, membersLoading] = useMembers(guild?.membersId);
  const [partOfGuild, setPartOfGuild] = useState<boolean>();

  useEffect(() => {
    if (!currentUser) return;
    if (!members) return;

    const partOfGuild = members.members.some(
      (member) => member.userId === currentUser.id
    );
    setPartOfGuild(partOfGuild);
  }, [currentUser, members]);

  return [
    partOfGuild,
    currentUserLoading || guildLoading || membersLoading,
  ] as const;
};

export default usePartOfGuild;
