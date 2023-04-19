import { getDoc } from 'firebase/firestore';
import { useQuery } from 'react-query';
import guildDoc from '../firebase/guildDoc';
import membersDoc from '../../member/firebase/membersDoc';
import rolesDoc from '../../role/firebase/rolesDoc';
import DiscordError from '../../../utils/DiscordError';

const getGuildOwnerId = async (guildId: string) => {
  const guild = (await getDoc(guildDoc(guildId))).data()!;
  const membersRef = membersDoc(guild.membersId);
  const rolesRef = rolesDoc(guild.rolesId);
  const [membersSnapshot, rolesSnapshot] = await Promise.all([
    getDoc(membersRef),
    getDoc(rolesRef),
  ]);
  const { members } = membersSnapshot.data()!;
  const { roles } = rolesSnapshot.data()!;

  const ownerRoleId = roles.find((role) => role.name === 'owner')?.id;
  if (!ownerRoleId) {
    throw new DiscordError(
      'missing-role',
      `Could not get guild owner id! Missing 'owner' role.`
    );
  }

  return members.find((member) => member.roleId === ownerRoleId)?.userId;
};

const useGuildOwnerId = (guildId: string | undefined) => {
  const {
    data: guildOwnerId,
    isLoading,
    error,
  } = useQuery(
    ['guild-owner-id', guildId],
    async () => await getGuildOwnerId(guildId!),
    {
      enabled: !!guildId,
    }
  );

  return [guildOwnerId, isLoading, error] as const;
};

export default useGuildOwnerId;
