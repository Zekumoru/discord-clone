import { useCurrentUser } from '../../../../../contexts/current-user/CurrentUserContext';
import { useScreenModal } from '../../../../../contexts/screen-modal/ScreenModalContext';
import InsetChevronListItem from '../../../../modal-utils/InsetChevronListItem';
import EditUsernameModal from './EditUsernameModal';

const EditUsernameListItem = () => {
  const [currentUser] = useCurrentUser();
  const [openModal, closeModal] = useScreenModal();

  return (
    <InsetChevronListItem
      label="Username"
      value={currentUser?.username}
      onClick={() => {
        openModal(<EditUsernameModal close={closeModal} />);
      }}
    />
  );
};

export default EditUsernameListItem;
