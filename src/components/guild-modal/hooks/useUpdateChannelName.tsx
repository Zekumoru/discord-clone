import { useMutation } from 'react-query';
import categoriesDoc from '../../../types/category/firebase/categoriesDoc';
import { getDoc, setDoc } from 'firebase/firestore';
import { queryClient } from '../../QueryClientInitializer';
import DiscordError from '../../../utils/DiscordError';
import performBatch from '../../../utils/performBatch';
import createCategoryLog from '../../../types/guild-log/utils/createCategoryLog';

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

  let oldChannelName: string | undefined;
  for (const category of categories.categories) {
    for (const channel of category.channels) {
      if (channel.id === channelId) {
        oldChannelName = channel.name;
        channel.name = newChannelName;
      }

      if (channel.id !== channelId && channel.name === newChannelName) {
        throw new DiscordError('already-exists', 'Channel name already used!');
      }
    }
  }

  await performBatch((batch) => {
    batch.set(categoriesRef, categories);

    if (oldChannelName === undefined) {
      throw new DiscordError('missing-channel', 'Could not find channel!');
    }

    createCategoryLog(batch, categories.guildId, {
      categoriesId,
      type: 'channel-name-updated',
      oldName: oldChannelName,
      newName: newChannelName,
    });
  });

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
