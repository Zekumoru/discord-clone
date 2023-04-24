import { useCurrentUser } from '../../../../../contexts/current-user/CurrentUserContext';
import { useModal } from '../../../../../contexts/modal/ModalContext';
import InsetChevronListItem from '../../../../modal-utils/InsetChevronListItem';
import EditUsernameModal from './EditUsernameModal';

const EditUsernameListItem = () => {
  const [currentUser] = useCurrentUser();
  const [openModal, closeModal] = useModal();

  return (
    <InsetChevronListItem
      label="Username"
      value={currentUser?.username}
      onClick={() => {
        openModal(<EditUsernameModal />);
      }}
    />
  );
};

export default EditUsernameListItem;
