import IChannel from '../channel/Channel';

interface ICategory {
  name: string;
  channels: IChannel[];
}

interface ICategories {
  id: string;
  guildId: string;
  categories: ICategory[];
}

export default ICategory;
export type { ICategories };
