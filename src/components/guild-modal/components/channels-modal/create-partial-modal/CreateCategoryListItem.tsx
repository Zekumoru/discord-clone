import { IconCategories } from '../../../../../assets/icons';
import { useModal } from '../../../../../contexts/modal/ModalContext';
import { useClosePartialModal } from '../../../../../contexts/partial-screen-modal/PartialScreenModalContext';
import CreateCategoryModal from '../../../../../contexts/sidebar/components/modals/CreateCategoryModal';

type CreateCategoryListItemProps = {
  categoriesId: string;
};

const CreateCategoryListItem = ({
  categoriesId,
}: CreateCategoryListItemProps) => {
  const close = useClosePartialModal();
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
