import { useCloseModal } from '../../../../../contexts/modal/ModalContext';
import ScreenModalToolbar from '../../../../../contexts/modal/components/ScreenModalToolbar';
import useCategories from '../../../../../types/category/hooks/useCategories';
import CategoryGroup from './CategoryGroup';

type ReorderChannelsModalProps = {
  categoriesId: string;
};

const ReorderChannelsModal = ({ categoriesId }: ReorderChannelsModalProps) => {
  const close = useCloseModal();
  const [categories] = useCategories(categoriesId);

  const handleDone = () => {
    close();
  };

  return (
    <div className="mb-4">
      <ScreenModalToolbar
        rightElement={
          <button onClick={handleDone} className={`font-semibold text-white`}>
            Done
          </button>
        }
      >
        Reorder Channels
      </ScreenModalToolbar>

      <div className="mt-2" />

      {categories?.categories.map((category) => (
        <CategoryGroup key={category.name} category={category} />
      ))}
    </div>
  );
};

export default ReorderChannelsModal;
