import { getDoc, setDoc } from 'firebase/firestore';
import { useMutation } from 'react-query';
import guildDoc from '../../../types/guild/firebase/guildDoc';
import rolesDoc from '../../../types/role/firebase/rolesDoc';
import membersDoc from '../../../types/member/firebase/membersDoc';
import DiscordError from '../../../utils/DiscordError';
import { queryClient } from '../../QueryClientInitializer';
import performBatch from '../../../utils/performBatch';
import createServerLog from '../../../types/guild-log/utils/createServerLog';

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

  let previousOwnerId: string | undefined;
  members.members.forEach((member) => {
    const { userId, roleId } = member;

    if (roleId && roleId === ownerRoleId) {
      member.roleId = memberRoleId;
      previousOwnerId = userId;
    }

    if (userId === newOwnerId) {
      member.roleId = ownerRoleId;
    }
  });

  await performBatch((batch) => {
    batch.set(membersRef, members);

    if (previousOwnerId === undefined) {
      throw new DiscordError('user-not-found', 'Could not find current owner!');
    }

    createServerLog(batch, guildId, {
      type: 'ownership-transferred',
      guildId,
      newOwnerId,
      previousOwnerId,
    });
  });

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
