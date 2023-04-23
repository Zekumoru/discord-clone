import { IconPlus } from '../../../../assets/icons';
import { usePartialModal } from '../../../../contexts/partial-screen-modal/PartialScreenModalContext';
import { useCategoriesId } from '../../../../types/category/contexts/CategoriesIdContext';
import useCategories from '../../../../types/category/hooks/useCategories';
import CategoryListItem from './CategoryListItem';
import ChannelsModalToolbar from './ChannelsModalToolbar';
import CreatePartialModal from './create-partial-modal/CreatePartialModal';

const ChannelsModal = () => {
  const categoriesId = useCategoriesId();
  const [categories] = useCategories(categoriesId);
  const [openPartialModal] = usePartialModal();

  const openCreatePartialModal = () => {
    openPartialModal(<CreatePartialModal />);
  };

  return (
    <div className="mb-4">
      <ChannelsModalToolbar />

      <ul className="mb-20 mt-10">
        {categories?.categories.map((category) => (
          <CategoryListItem key={category.name} category={category} />
        ))}
      </ul>

      <div className="fixed bottom-4 left-0 right-0">
        <button
          onClick={openCreatePartialModal}
          className="mx-auto flex items-center gap-2 rounded-full bg-warmblue-100 px-4 py-2.5 shadow-lg"
        >
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
