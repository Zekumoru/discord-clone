import { IconCategories } from '../../../../../assets/icons';
import { PartialScreenModalProps } from '../../../../../contexts/partial-screen-modal/PartialScreenModalContext';
import { useModal } from '../../../../../contexts/modal/ModalContext';

type ReorderCategoryListItemProps = {
  categoriesId: string;
} & PartialScreenModalProps;

const ReorderCategoryListItem = ({
  categoriesId,
  close,
}: ReorderCategoryListItemProps) => {
  const [openModal, closeModal] = useModal();

  const openReorderCategoryModal = () => {};

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
