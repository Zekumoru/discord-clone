import { toast } from 'react-toastify';
import { IconCategories } from '../../../../../assets/icons';
import { useModal } from '../../../../../contexts/modal/ModalContext';
import { useClosePartialModal } from '../../../../../contexts/partial-screen-modal/PartialScreenModalContext';
import CreateCategoryModal from '../../../../../contexts/sidebar/components/modals/CreateCategoryModal';
import { useCategoriesId } from '../../../../../types/category/contexts/CategoriesIdContext';

const CreateCategoryListItem = () => {
  const close = useClosePartialModal();
  const categoriesId = useCategoriesId();
  const [openModal] = useModal();

  const openCreateCategoryModal = () => {
    if (!categoriesId) {
      toast.error('Could not open modal!');
      return;
    }

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
