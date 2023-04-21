import { ScreenModalProps } from '../../../../contexts/screen-modal/ScreenModalContext';
import ScreenModalToolbar from '../../../../contexts/screen-modal/components/ScreenModalToolbar';
import useCategories from '../../../../types/category/hooks/useCategories';
import ModalChevronCloseButton from '../../../modal-utils/ModalChevronCloseButton';
import CategoryListItem from './CategoryListItem';
import ChannelsModalToolbar from './ChannelsModalToolbar';

type ChannelsModalProps = {
  categoriesId: string;
} & ScreenModalProps;

const ChannelsModal = ({ categoriesId, close }: ChannelsModalProps) => {
  const [categories] = useCategories(categoriesId);

  return (
    <div className="min-h-screen bg-background-300">
      <ChannelsModalToolbar close={close} />

      <ul className="mt-10">
        {categories?.categories.map((category) => (
          <CategoryListItem key={category.name} category={category} />
        ))}
      </ul>
    </div>
  );
};

export default ChannelsModal;
