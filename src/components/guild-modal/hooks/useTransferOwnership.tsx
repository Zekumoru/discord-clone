import { getDoc, setDoc } from 'firebase/firestore';
import { useMutation } from 'react-query';
import guildDoc from '../../../types/guild/firebase/guildDoc';
import rolesDoc from '../../../types/role/firebase/rolesDoc';
import membersDoc from '../../../types/member/firebase/membersDoc';
import DiscordError from '../../../utils/DiscordError';
import { queryClient } from '../../QueryClientInitializer';

type TransferOwnershipOptions = {
  guildId: string;
  newOwnerId: string;
};

const transferOwnership = async ({
  guildId,
  newOwnerId,
}: TransferOwnershipOptions) => {
  const guild = (await getDoc(guildDoc(guildId))).data()!;
  const { roles } = (await getDoc(rolesDoc(guild.rolesId))).data()!;
  const membersRef = membersDoc(guild.membersId);
  const members = (await getDoc(membersRef)).data()!;

  const ownerRoleId = roles.find((role) => role.name === 'owner')?.id;
  if (!ownerRoleId) {
    throw new DiscordError('missing-role', 'Owner role is missing!');
  }

  const memberRoleId = roles.find((role) => role.name === 'member')?.id;
  if (!memberRoleId) {
    throw new DiscordError('missing-role', 'Member role is missing!');
  }

  members.members.forEach((member) => {
    const { userId, roleId } = member;

    if (roleId && roleId === ownerRoleId) {
      member.roleId = memberRoleId;
    }

    if (userId === newOwnerId) {
      member.roleId = ownerRoleId;
    }
  });

  await setDoc(membersRef, members);
  await queryClient.invalidateQueries(['members', guild.membersId]);
  await queryClient.invalidateQueries(['guild-owner-id', guild.id]);
};

type UseTransferOwnershipProps = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

const useTransferOwnership = ({
  onSuccess,
  onError,
}: UseTransferOwnershipProps = {}) => {
  return useMutation(transferOwnership, {
    onSuccess,
    onError,
  });
};

export default useTransferOwnership;
