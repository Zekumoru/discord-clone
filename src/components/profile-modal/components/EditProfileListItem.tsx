import { IconChevronRight, IconPencil } from '../../../assets/icons';
import { useScreenModal } from '../../../contexts/screen-modal/ScreenModalContext';
import InsetListItem from '../../modal-utils/InsetListItem';
import EditProfileModal from './edit-profile-modal/EditProfileModal';

const EditProfileListItem = () => {
  const [openModal, closeModal] = useScreenModal();

  const handleOpenModal = () => {
    openModal(<EditProfileModal close={closeModal} />);
  };

  return (
    <InsetListItem
      onClick={handleOpenModal}
      prefix={<IconPencil className="h-6 w-6 text-silvergrey-600" />}
      postfix={<IconChevronRight className="ml-auto h-4 w-4" strokeWidth={3} />}
    >
      Profile
    </InsetListItem>
  );
};

export default EditProfileListItem;
