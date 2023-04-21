import ICategory from '../../../../types/category/Category';
import ChannelListItem from './ChannelListItem';

type CategoryListItemProps = {
  category: ICategory;
};

const CategoryListItem = ({ category }: CategoryListItemProps) => {
  return (
    <li>
      {category.name !== '' && (
        <div className="mx-4 flex items-center gap-2.5">
          <div className="heading-2 truncate">{category.name}</div>
          <button className="ml-auto text-sm font-semibold text-silvergrey-300">
            Edit
          </button>
        </div>
      )}

      <ul className="mb-8">
        {category.channels.map((channel) => (
          <ChannelListItem key={channel.id} channel={channel} />
        ))}
      </ul>
    </li>
  );
};

export default CategoryListItem;
