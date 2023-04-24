import { useMutation } from 'react-query';
import IChannel from '../../../types/channel/Channel';
import categoriesDoc from '../../../types/category/firebase/categoriesDoc';
import { getDoc, setDoc } from 'firebase/firestore';
import DiscordError from '../../../utils/DiscordError';
import findChannel from '../../../types/channel/utils/findChannel';
import { queryClient } from '../../QueryClientInitializer';

type ChangeCategoryOptions = {
  channelId: string;
  categoriesId: string;
  moveToCategoryName: string;
};

const changeCategory = async ({
  categoriesId,
  moveToCategoryName,
  channelId,
}: ChangeCategoryOptions) => {
  const categoriesRef = categoriesDoc(categoriesId);
  const categories = (await getDoc(categoriesRef)).data()!;

  const [channel, formerCategory] = findChannel(
    channelId,
    categories.categories
  );
  if (!channel || !formerCategory) {
    throw new DiscordError('missing-channel', 'Channel is missing!');
  }

  const category = categories.categories.find(
    (category) => category.name === moveToCategoryName
  );
  if (!category) {
    throw new DiscordError('missing-category', 'Category is missing!');
  }

  category.channels.push(channel);
  formerCategory.channels = formerCategory.channels.filter(
    (channel) => channel.id !== channelId
  );

  await setDoc(categoriesRef, categories);
  await queryClient.invalidateQueries(['categories', categoriesId]);
};

type UseChangeCategoryProps = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

const useChangeCategory = ({
  onSuccess,
  onError,
}: UseChangeCategoryProps = {}) => {
  return useMutation(changeCategory, {
    onSuccess,
    onError,
  });
};

export default useChangeCategory;
