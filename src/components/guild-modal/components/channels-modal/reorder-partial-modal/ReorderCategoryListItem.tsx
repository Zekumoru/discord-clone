import { IconCategories } from '../../../../../assets/icons';
import { useModal } from '../../../../../contexts/modal/ModalContext';
import { useClosePartialModal } from '../../../../../contexts/partial-screen-modal/PartialScreenModalContext';
import ReorderCategoriesModal from '../reorder-categories-modal/ReorderCategoriesModal';

type ReorderCategoryListItemProps = {
  categoriesId: string;
};

const ReorderCategoryListItem = ({
  categoriesId,
}: ReorderCategoryListItemProps) => {
  const close = useClosePartialModal();
  const [openModal] = useModal();

  const openReorderCategoryModal = () => {
    openModal(<ReorderCategoriesModal categoriesId={categoriesId} />);
    close();
  };

  return (
    <li
      onClick={openReorderCategoryModal}
      className="flex items-center gap-2 px-4 py-3 font-semibold text-silvergrey-300"
    >
      <IconCategories className="h-6 w-6 text-silvergrey-400" />
      <span>Category</span>
    </li>
  );
};

export default ReorderCategoryListItem;
