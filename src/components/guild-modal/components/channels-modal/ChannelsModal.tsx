import { IconPlus } from '../../../../assets/icons';
import { ScreenModalProps } from '../../../../contexts/screen-modal/ScreenModalContext';
import useCategories from '../../../../types/category/hooks/useCategories';
import CategoryListItem from './CategoryListItem';
import ChannelsModalToolbar from './ChannelsModalToolbar';

type ChannelsModalProps = {
  categoriesId: string;
} & ScreenModalProps;

const ChannelsModal = ({ categoriesId, close }: ChannelsModalProps) => {
  const [categories] = useCategories(categoriesId);

  return (
    <div className="mb-4">
      <ChannelsModalToolbar close={close} />

      <ul className="mb-20 mt-10">
        {categories?.categories.map((category) => (
          <CategoryListItem key={category.name} category={category} />
        ))}
      </ul>

      <div className="fixed bottom-4 left-0 right-0">
        <button className="mx-auto flex items-center gap-2 rounded-full bg-warmblue-100 px-4 py-2.5 shadow-lg">
          <IconPlus
            className="relative -top-[0.5px] h-5 w-5"
            strokeWidth={2.5}
          />
          <span className="font-semibold">Create</span>
        </button>
      </div>
    </div>
  );
};

export default ChannelsModal;
