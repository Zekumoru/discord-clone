import { ScreenModalProps } from '../../../../../contexts/screen-modal/ScreenModalContext';
import ScreenModalToolbar from '../../../../../contexts/screen-modal/components/ScreenModalToolbar';
import useCategories from '../../../../../types/category/hooks/useCategories';
import CategoryGroup from './CategoryGroup';

type ReorderChannelsModalProps = {
  categoriesId: string;
} & ScreenModalProps;

const ReorderChannelsModal = ({
  categoriesId,
  close,
}: ReorderChannelsModalProps) => {
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
