import ICategory from '../../category/Category';
import IChannel from '../Channel';

const findChannel = (
  channelId: string,
  categories: ICategory[]
): [IChannel | undefined, ICategory | undefined] => {
  for (const category of categories) {
    for (const channel of category.channels) {
      if (channel.id === channelId) {
        return [channel, category];
      }
    }
  }

  return [undefined, undefined];
};

export default findChannel;
