import { WriteBatch } from 'firebase/firestore';
import performBatch from '../../../utils/performBatch';
import snowflakeId from '../../../utils/snowflake-id/snowflakeId';
import categoriesDoc from '../../category/firebase/categoriesDoc';
import createCategory from '../../category/utils/createCategory';
import membersDoc from '../../member/firebase/membersDoc';
import rolesDoc from '../../role/firebase/rolesDoc';
import createRole from '../../role/utils/createRole';
import IGuild from '../Guild';
import guildDoc from '../firebase/guildDoc';
import IMember from '../../member/Member';
import IUser from '../../user/User';
import createMember from '../../member/utils/createMember';

type InitGuildOptions = {
  owner: IUser;
  guildId: string;
  guildName: string;
  pictureUrl: string | null;
};

const initGuildCollections = (
  batch: WriteBatch,
  { owner, guildId, guildName, pictureUrl }: InitGuildOptions
) => {
  let guild: IGuild | undefined;

  const categoriesId = snowflakeId();
  const categories = [createCategory('text channels', ['general'])];
  batch.set(categoriesDoc(categoriesId), {
    guildId,
    categories,
    id: categoriesId,
  });

  const rolesId = snowflakeId();
  const roles = [
    createRole('owner'),
    createRole('admin'),
    createRole('member'),
  ];
  batch.set(rolesDoc(rolesId), {
    guildId,
    roles,
    id: rolesId,
  });

  const membersId = snowflakeId();
  const members: IMember[] = [
    createMember(owner.id, roles.find((r) => r.name === 'owner')!.id),
  ];
  batch.set(membersDoc(membersId), {
    guildId,
    members,
    id: membersId,
  });

  guild = {
    pictureUrl,
    categoriesId,
    membersId,
    rolesId,
    id: guildId,
    name: guildName,
    systemMessagesChannelId: categories[0].channels[0].id,
  };
  batch.set(guildDoc(guildId), guild);

  return { guild, categories, members, roles };
};

export default initGuildCollections;
