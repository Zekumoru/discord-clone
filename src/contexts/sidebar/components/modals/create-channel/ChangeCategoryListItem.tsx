import { toast } from 'react-toastify';
import { IconFolderPlus } from '../../../../../assets/icons';
import InsetChevronListItem from '../../../../../components/modal-utils/InsetChevronListItem';
import { useScreenModal } from '../../../../screen-modal/ScreenModalContext';
import CategoryPickerModal from './CategoryPickerModal';

type ChangeCategoryListItemProps = {
  categoriesId: string;
  categoryName: string;
  onChange: (categoryName: string) => void;
};

const ChangeCategoryListItem = ({
  categoriesId,
  categoryName,
  onChange,
}: ChangeCategoryListItemProps) => {
  const [openModal, closeModal] = useScreenModal();

  const openPickCategoryModal = () => {
    if (categoryName === undefined) {
      toast.error('Could not open modal!');
      return;
    }

    openModal(
      <CategoryPickerModal
        categoriesId={categoriesId}
        categoryName={categoryName}
        onPick={(categoryName) => {
          onChange(categoryName);
          closeModal();
        }}
        close={closeModal}
      />
    );
  };

  return (
    <InsetChevronListItem
      onClick={openPickCategoryModal}
      labelPrefix={<IconFolderPlus className="h-6 w-6 text-silvergrey-400" />}
      label="Category"
      value={categoryName === '' ? 'Uncategorized' : categoryName}
    />
  );
};

export default ChangeCategoryListItem;
