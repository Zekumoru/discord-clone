import { useMutation } from 'react-query';
import IUser from '../../user/User';
import IGuild from '../Guild';
import userGuildsDoc from '../../user/firebase/userGuildsDoc';
import { getDoc } from 'firebase/firestore';
import performBatch from '../../../utils/performBatch';
import membersDoc from '../../member/firebase/membersDoc';
import createMember from '../../member/utils/createMember';
import rolesDoc from '../../role/firebase/rolesDoc';
import DiscordError from '../../../utils/DiscordError';
import { queryClient } from '../../../components/QueryClientInitializer';
import createMemberLog from '../../guild-log/utils/createMemberLog';

type JoinGuildOptions = {
  user: IUser;
  guild: IGuild;
};

const joinGuild = async ({ user, guild }: JoinGuildOptions) => {
  const userGuildsRef = userGuildsDoc(user.guildsId);
  const userGuilds = (await getDoc(userGuildsRef)).data()!;
  const membersRef = membersDoc(guild.membersId);
  const members = (await getDoc(membersRef)).data()!;
  const { roles } = (await getDoc(rolesDoc(guild.rolesId))).data()!;
  const roleId = roles.find((role) => role.name === 'member')?.id;

  if (members.members.some((member) => member.userId === user.id)) {
    return { guild, user };
  }

  if (!roleId) {
    throw new DiscordError(
      'missing-role',
      'Could not join guild! The "member" role is missing.'
    );
  }

  await performBatch((batch) => {
    batch.set(userGuildsRef, {
      ...userGuilds,
      guildsList: [
        ...userGuilds.guildsList,
        {
          guildId: guild.id,
        },
      ],
    });

    batch.set(membersRef, {
      ...members,
      members: [...members.members, createMember(user.id, roleId)],
    });

    createMemberLog(batch, guild.id, {
      type: 'user-joined',
      userId: user.id,
    });
  });

  await Promise.all([
    queryClient.invalidateQueries(['user-guilds', user.guildsId]),
    queryClient.invalidateQueries(['guild', guild.id]),
    queryClient.invalidateQueries(['members', guild.membersId]),
  ]);

  return { guild, user };
};

type UseJoinGuildProps = {
  onSuccess?: (data: Awaited<ReturnType<typeof joinGuild>>) => void;
  onError?: (error: unknown) => void;
};

const useJoinGuild = ({ onSuccess, onError }: UseJoinGuildProps = {}) => {
  return useMutation(joinGuild, {
    onSuccess,
    onError,
  });
};

export default useJoinGuild;
