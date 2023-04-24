import { getDoc } from 'firebase/firestore';
import { useMutation } from 'react-query';
import guildDoc from '../../../types/guild/firebase/guildDoc';
import membersDoc from '../../../types/member/firebase/membersDoc';
import userGuildsDoc from '../../../types/user/firebase/userGuildsDoc';
import performBatch from '../../../utils/performBatch';
import { queryClient } from '../../QueryClientInitializer';

type RemoveMemberOptions = {
  guildId: string;
  userGuildsId: string;
};

const removeMember = async ({ guildId, userGuildsId }: RemoveMemberOptions) => {
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
  });

  await queryClient.invalidateQueries(['members', members.id]);
  await queryClient.invalidateQueries(['members-users', members.id]);
  await queryClient.invalidateQueries(['user-guilds', userGuilds.id]);
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
