import { useMutation } from 'react-query';
import categoriesDoc from '../../../types/category/firebase/categoriesDoc';
import { getDoc, setDoc } from 'firebase/firestore';
import findChannel from '../../../types/channel/utils/findChannel';
import DiscordError from '../../../utils/DiscordError';
import { queryClient } from '../../QueryClientInitializer';
import performBatch from '../../../utils/performBatch';
import createCategoryLog from '../../../types/guild-log/utils/createCategoryLog';

type DeleteChannelOptions = {
  channelId: string;
  categoriesId: string;
};

const deleteChannel = async ({
  channelId,
  categoriesId,
}: DeleteChannelOptions) => {
  const categoriesRef = categoriesDoc(categoriesId);
  const categories = (await getDoc(categoriesRef)).data()!;

  const [channel, category] = findChannel(channelId, categories.categories);
  if (!channel) {
    throw new DiscordError('missing-channel', 'Channel is missing!');
  }

  if (!category) {
    throw new DiscordError('missing-category', 'Category is missing!');
  }

  category.channels = category.channels.filter(
    (channel) => channel.id !== channelId
  );

  await performBatch((batch) => {
    batch.set(categoriesRef, categories);

    createCategoryLog(batch, categories.guildId, {
      type: 'channel-deleted',
      categoriesId,
      channelName: channel.name,
    });
  });

  await queryClient.invalidateQueries(['categories', categoriesId]);
};

type UseDeleteChannelProps = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

const useDeleteChannel = ({
  onSuccess,
  onError,
}: UseDeleteChannelProps = {}) => {
  return useMutation(deleteChannel, {
    onSuccess,
    onError,
  });
};

export default useDeleteChannel;
