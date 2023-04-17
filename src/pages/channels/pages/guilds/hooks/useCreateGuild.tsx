import { useMutation } from 'react-query';
import { uploadImage } from '../../../../../hooks/useUploadImage';
import snowflakeId from '../../../../../utils/snowflake-id/snowflakeId';
import initGuildCollections from '../../../../../types/guild/utils/initGuildCollections';
import IGuild from '../../../../../types/guild/Guild';
import performBatch from '../../../../../utils/performBatch';
import IUser from '../../../../../types/user/User';
import userGuildsDoc from '../../../../../types/user/firebase/userGuildsDoc';
import { getDoc } from 'firebase/firestore';

type CreateGuildArgs = {
  name: string;
  owner: IUser;
  picture: File | null;
};

const createGuild = async ({ name, picture, owner }: CreateGuildArgs) => {
  const guildId = snowflakeId();
  let pictureUrl: string | null = null;

  if (picture) {
    const [_type, extension] = picture.type.split('/');
    const { url } = await uploadImage({
      image: picture,
      path: `guild-pictures/${guildId}/picture.${extension}`,
    });

    pictureUrl = url;
  }

  return await performBatch(async (batch) => {
    const { guild } = initGuildCollections(batch, {
      owner,
      guildId,
      pictureUrl,
      guildName: name,
    });

    const ownerGuildsDoc = userGuildsDoc(owner.guildsId);
    const ownerGuilds = (await getDoc(ownerGuildsDoc)).data()!;
    batch.set(ownerGuildsDoc, {
      ...ownerGuilds,
      guildsList: [
        ...ownerGuilds.guildsList,
        {
          guildId: guild.id,
        },
      ],
    });

    return guild;
  });
};

type UseCreateGuildOptions = {
  onSuccess?: (guild: IGuild) => void;
};

const useCreateGuild = ({ onSuccess }: UseCreateGuildOptions = {}) => {
  return useMutation(createGuild, {
    onSuccess,
  });
};

export default useCreateGuild;