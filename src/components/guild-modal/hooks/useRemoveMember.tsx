import { getDoc } from 'firebase/firestore';
import { useMutation } from 'react-query';
import guildDoc from '../../../types/guild/firebase/guildDoc';
import membersDoc from '../../../types/member/firebase/membersDoc';
import userGuildsDoc from '../../../types/user/firebase/userGuildsDoc';
import performBatch from '../../../utils/performBatch';
import { queryClient } from '../../QueryClientInitializer';
import IGuildMemberEvent from '../../../types/guild-log/events/GuildMemberEvent';
import createMemberLog from '../../../types/guild-log/utils/createMemberLog';

type RemoveMemberOptions = {
  guildId: string;
  userGuildsId: string;
  type: Extract<IGuildMemberEvent['type'], 'user-kicked' | 'user-left'>;
};

const removeMember = async ({
  guildId,
  userGuildsId,
  type,
}: RemoveMemberOptions) => {
  const guild = (await getDoc(guildDoc(guildId))).data()!;
  const membersRef = membersDoc(guild.membersId);
  const members = (await getDoc(membersRef)).data()!;
  const userGuildsRef = userGuildsDoc(userGuildsId);
  const userGuilds = (await getDoc(userGuildsRef)).data()!;
  const userId = userGuilds.userId;

  await performBatch((batch) => {
    members.members = members.members.filter(
      (member) => member.userId !== userId
    );
    batch.set(membersRef, members);

    userGuilds.guildsList = userGuilds.guildsList.filter(
      (guild) => guild.guildId !== guildId
    );
    batch.set(userGuildsRef, userGuilds);

    createMemberLog(batch, guildId, {
      type,
      userId,
    });
  });

  await Promise.all([
    queryClient.invalidateQueries(['members', members.id]),
    queryClient.invalidateQueries(['members-users', members.id]),
    queryClient.invalidateQueries(['user-guilds', userGuilds.id]),
  ]);
};

type UseRemoveMemberProps = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

const useRemoveMember = ({ onSuccess, onError }: UseRemoveMemberProps = {}) => {
  return useMutation(removeMember, {
    onSuccess,
    onError,
  });
};

export default useRemoveMember;
