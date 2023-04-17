import { IconChevronRight } from '../../../../../assets/icons';
import { useCurrentUser } from '../../../../../contexts/current-user/CurrentUserContext';
import { useScreenModal } from '../../../../../contexts/screen-modal/ScreenModalContext';
import InsetListItem from '../../../../modal-utils/InsetListItem';
import EditUsernameModal from './EditUsernameModal';

const EditUsernameListItem = () => {
  const [currentUser] = useCurrentUser();
  const [openModal, closeModal] = useScreenModal();

  return (
    <InsetListItem
      onClick={() => {
        openModal(<EditUsernameModal close={closeModal} />);
      }}
      className="ml-auto text-right font-medium"
      prefix={<span className="text-white">Username</span>}
      postfix={<IconChevronRight className="h-4 w-4" strokeWidth={3} />}
    >
      {currentUser?.username}
    </InsetListItem>
  );
};

export default EditUsernameListItem;
