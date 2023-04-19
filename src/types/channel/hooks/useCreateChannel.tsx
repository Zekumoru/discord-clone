import { useMutation } from 'react-query';
import categoriesDoc from '../../category/firebase/categoriesDoc';
import { getDoc, setDoc } from 'firebase/firestore';
import DiscordError from '../../../utils/DiscordError';
import snowflakeId from '../../../utils/snowflake-id/snowflakeId';
import { queryClient } from '../../../components/QueryClientInitializer';

type CreateChannelOptions = {
  categoriesId: string;
  categoryName: string;
  channelName: string;
};

const createChannel = async ({
  categoriesId,
  categoryName,
  channelName,
}: CreateChannelOptions) => {
  const categoriesRef = categoriesDoc(categoriesId);
  const categories = (await getDoc(categoriesRef)).data()!;

  const category = categories.categories.find(
    (category) => category.name === categoryName
  );
  if (!category) {
    throw new DiscordError(
      'missing-category',
      `Could not create channel! Missing category: ${categoryName}`
    );
  }

  if (category.channels.some((channel) => channel.name === channelName)) {
    throw new DiscordError(
      'already-exists',
      `Could not create channel! Channel already exists: ${channelName}`
    );
  }

  category.channels.push({
    id: snowflakeId(),
    name: channelName,
  });

  await setDoc(categoriesRef, categories);
  await queryClient.invalidateQueries(['categories', categoriesId]);
};

type UseCreateChannelProps = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

const useCreateChannel = ({
  onSuccess,
  onError,
}: UseCreateChannelProps = {}) => {
  return useMutation(createChannel, {
    onSuccess,
    onError,
  });
};

export default useCreateChannel;
