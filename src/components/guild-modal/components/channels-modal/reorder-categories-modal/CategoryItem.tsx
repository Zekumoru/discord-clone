import { IconDragDots } from '../../../../../assets/icons';
import ICategory from '../../../../../types/category/Category';

type CategoryItemProps = {
  category: ICategory;
};

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <div className="flex items-center px-4 py-2.5">
      <div className="heading-2 truncate">{category.name}</div>

      <IconDragDots className="ml-auto h-7 w-7 flex-shrink-0 text-silvergrey-400" />
    </div>
  );
};

export default CategoryItem;
