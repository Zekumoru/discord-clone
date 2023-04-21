import { useMemo } from 'react';
import { ICategories } from '../../../types/category/Category';
import IChannel from '../../../types/channel/Channel';

const useCategoryName = (
  categories: ICategories | undefined,
  channel: IChannel | undefined
) => {
  return useMemo(() => {
    if (!categories || !channel) return;

    const channelName = channel.name;
    for (const category of categories.categories) {
      for (const channel of category.channels) {
        if (channel.name !== channelName) continue;
        if (category.name === '') return 'Uncategorized';
        return category.name;
      }
    }
  }, [categories, channel]);
};

export default useCategoryName;
