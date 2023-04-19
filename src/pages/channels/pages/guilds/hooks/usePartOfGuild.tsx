import { useEffect, useState } from 'react';
import useMembers from '../../../../../types/member/hooks/useMembers';
import IGuild from '../../../../../types/guild/Guild';
import IUser from '../../../../../types/user/User';

const usePartOfGuild = (guild: IGuild | undefined, user: IUser | undefined) => {
  const [members, membersLoading] = useMembers(guild?.membersId);
  const [partOfGuild, setPartOfGuild] = useState<boolean>();

  useEffect(() => {
    if (!user) return;
    if (!members) return;

    const partOfGuild = members.members.some(
      (member) => member.userId === user.id
    );
    setPartOfGuild(partOfGuild);
  }, [user, members]);

  return [partOfGuild, membersLoading] as const;
};

export default usePartOfGuild;
