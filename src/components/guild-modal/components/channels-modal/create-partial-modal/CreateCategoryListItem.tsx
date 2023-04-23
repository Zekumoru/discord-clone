import { IconCategories } from '../../../../../assets/icons';
import { PartialScreenModalProps } from '../../../../../contexts/partial-screen-modal/PartialScreenModalContext';
import { useModal } from '../../../../../contexts/modal/ModalContext';
import CreateCategoryModal from '../../../../../contexts/sidebar/components/modals/CreateCategoryModal';

type CreateCategoryListItemProps = {
  categoriesId: string;
} & PartialScreenModalProps;

const CreateCategoryListItem = ({
  categoriesId,
  close,
}: CreateCategoryListItemProps) => {
  const [openModal] = useModal();

  const openCreateCategoryModal = () => {
    openModal(<CreateCategoryModal categoriesId={categoriesId} />);
    close();
  };

  return (
    <li
      onClick={openCreateCategoryModal}
      className="flex items-center gap-2 px-4 py-3 font-semibold text-silvergrey-300"
    >
      <IconCategories className="h-6 w-6 text-silvergrey-400" />
      <span>Category</span>
    </li>
  );
};

export default CreateCategoryListItem;
