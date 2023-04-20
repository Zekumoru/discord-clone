import { getDoc } from 'firebase/firestore';
import { useMutation } from 'react-query';
import guildDoc from '../../../types/guild/firebase/guildDoc';
import performBatch from '../../../utils/performBatch';
import membersDoc from '../../../types/member/firebase/membersDoc';
import categoriesDoc from '../../../types/category/firebase/categoriesDoc';
import rolesDoc from '../../../types/role/firebase/rolesDoc';
import { getInviteFromGuildId } from '../../../types/invite/hooks/useInviteFromGuildId';
import IMember from '../../../types/member/Member';
import userDoc from '../../../types/user/firebase/userDoc';
import userGuildsDoc from '../../../types/user/firebase/userGuildsDoc';
import inviteDoc from '../../../types/invite/firebase/inviteDoc';

const getMembersGuilds = async (members: IMember[]) => {
  return await Promise.all(
    members.map(async (member) => {
      const userRef = userDoc(member.userId);
      const user = (await getDoc(userRef)).data()!;

      const userGuildsRef = userGuildsDoc(user.guildsId);
      return (await getDoc(userGuildsRef)).data()!;
    })
  );
};

const deleteGuild = async (guildId: string) => {
  const guildRef = guildDoc(guildId);
  const guild = (await getDoc(guildRef)).data()!;
  const categoriesRef = categoriesDoc(guild.categoriesId);
  const membersRef = membersDoc(guild.membersId);
  const members = (await getDoc(membersRef)).data()!;
  const rolesRef = rolesDoc(guild.rolesId);
  const invite = await getInviteFromGuildId(guildId);
  const membersGuilds = await getMembersGuilds(members.members);

  await performBatch(async (batch) => {
    // remove guild from its members
    membersGuilds.forEach((memberGuilds) => {
      const memberGuildsRef = userGuildsDoc(memberGuilds.id);
      batch.set(memberGuildsRef, {
        ...memberGuilds,
        guildsList: memberGuilds.guildsList.filter(
          (memberGuild) => memberGuild.guildId !== guildId
        ),
      });
    });

    // remove guild collections
    batch.delete(categoriesRef);
    batch.delete(membersRef);
    batch.delete(rolesRef);
    if (invite) {
      batch.delete(inviteDoc(invite.id));
    }

    // and finally... remove the guild
    batch.delete(guildRef);
  });
};

type UseDeleteGuildProps = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

const useDeleteGuild = ({ onSuccess, onError }: UseDeleteGuildProps = {}) => {
  return useMutation(deleteGuild, { onSuccess, onError });
};

export default useDeleteGuild;
