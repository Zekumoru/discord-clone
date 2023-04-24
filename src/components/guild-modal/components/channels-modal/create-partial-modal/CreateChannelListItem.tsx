import { toast } from 'react-toastify';
import { useModal } from '../../../../../contexts/modal/ModalContext';
import { useClosePartialModal } from '../../../../../contexts/partial-screen-modal/PartialScreenModalContext';
import CreateChannelModal from '../../../../../contexts/sidebar/components/modals/create-channel/CreateChannelModal';
import { useCategoriesId } from '../../../../../types/category/contexts/CategoriesIdContext';

const CreateChannelListItem = () => {
  const close = useClosePartialModal();
  const categoriesId = useCategoriesId();
  const [openModal] = useModal();

  const openCreateChannelModal = () => {
    if (!categoriesId) {
      toast.error('Could not open modal!');
      return;
    }

    openModal(
      <CreateChannelModal initialCategoryName="" categoriesId={categoriesId} />
    );
    close();
  };

  return (
    <li
      onClick={openCreateChannelModal}
      className="flex items-center gap-2 px-4 py-3 font-semibold text-silvergrey-300"
    >
      <span className="grid h-6 w-6 place-content-center text-xl font-bold text-silvergrey-400">
        #
      </span>
      <span>Channel</span>
    </li>
  );
};

export default CreateChannelListItem;
