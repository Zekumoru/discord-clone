import { useMutation } from 'react-query';
import categoriesDoc from '../../../types/category/firebase/categoriesDoc';
import { getDoc, setDoc } from 'firebase/firestore';
import { queryClient } from '../../QueryClientInitializer';
import DiscordError from '../../../utils/DiscordError';

type UpdateChannelNameOptions = {
  categoriesId: string;
  channelId: string;
  newChannelName: string;
};

const updateChannelName = async ({
  categoriesId,
  channelId,
  newChannelName,
}: UpdateChannelNameOptions) => {
  const categoriesRef = categoriesDoc(categoriesId);
  const categories = (await getDoc(categoriesRef)).data()!;

  for (const category of categories.categories) {
    for (const channel of category.channels) {
      if (channel.id === channelId) {
        channel.name = newChannelName;
      }

      if (channel.id !== channelId && channel.name === newChannelName) {
        throw new DiscordError('already-exists', 'Channel name already used!');
      }
    }
  }

  await setDoc(categoriesRef, categories);
  await queryClient.invalidateQueries(['categories', categoriesId]);
};

type UseUpdateChannelNameProps = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

const useUpdateChannelName = ({
  onSuccess,
  onError,
}: UseUpdateChannelNameProps = {}) => {
  return useMutation(updateChannelName, {
    onSuccess,
    onError,
  });
};

export default useUpdateChannelName;
