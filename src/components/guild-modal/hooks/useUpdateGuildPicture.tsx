import { useMutation } from 'react-query';
import { UploadImageArgs, uploadImage } from '../../../hooks/useUploadImage';
import IGuild from '../../../types/guild/Guild';
import { setDoc } from 'firebase/firestore';
import guildDoc from '../../../types/guild/firebase/guildDoc';
import { queryClient } from '../../QueryClientInitializer';

type UpdateGuildPictureOptions = {
  guild: IGuild;
} & UploadImageArgs;

const updateGuildPicture = async ({
  guild,
  image,
  path,
}: UpdateGuildPictureOptions) => {
  const { url } = await uploadImage({ image, path });

  await setDoc(guildDoc(guild.id), {
    ...guild,
    pictureUrl: url,
  });

  await queryClient.invalidateQueries(['guild', guild.id]);
};

type UseUpdateGuildPictureProps = {
  onSuccess?: () => void;
};

const useUpdateGuildPicture = ({
  onSuccess,
}: UseUpdateGuildPictureProps = {}) => {
  return useMutation(updateGuildPicture, {
    onSuccess,
  });
};

export default useUpdateGuildPicture;
