import performBatch from '../../../utils/performBatch';
import snowflakeId from '../../../utils/snowflake-id/snowflakeId';
import categoriesDoc from '../../category/firebase/categoriesDoc';
import createCategory from '../../category/utils/createCategory';
import membersDoc from '../../member/firebase/membersDoc';
import rolesDoc from '../../role/firebase/rolesDoc';
import createRole from '../../role/utils/createRole';
import IGuild from '../Guild';
import guildDoc from '../firebase/guildDoc';

const initGuildCollections = async (
  guildName: string,
  pictureUrl: string | null
) => {
  let guild: IGuild | undefined;

  await performBatch((batch) => {
    const guildId = snowflakeId();

    const categoriesId = snowflakeId();
    const category = createCategory('text channels', ['general']);
    batch.set(categoriesDoc(categoriesId), {
      guildId,
      id: categoriesId,
      categories: [category],
    });

    const membersId = snowflakeId();
    batch.set(membersDoc(membersId), {
      guildId,
      id: membersId,
      members: [],
    });

    const rolesId = snowflakeId();
    batch.set(rolesDoc(rolesId), {
      guildId,
      id: rolesId,
      roles: [createRole('admin'), createRole('member')],
    });

    guild = {
      pictureUrl,
      categoriesId,
      membersId,
      rolesId,
      id: guildId,
      name: guildName,
      systemMessagesChannelId: category.channels[0].id,
    };
    batch.set(guildDoc(guildId), guild);
  });

  return guild;
};

export default initGuildCollections;
