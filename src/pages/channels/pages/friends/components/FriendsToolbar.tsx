import { IconUserPlus } from '../../../../../assets/icons';
import { useModal } from '../../../../../contexts/modal/ModalContext';
import Toolbar from '../../../components/Toolbar';
import AddFriendScreenModal from './add-friend-screen-modal/AddFriendScreenModal';

const FriendsToolbar = () => {
  const [openModal] = useModal();

  return (
    <Toolbar
      buttons={
        <div onClick={() => openModal(<AddFriendScreenModal />)}>
          <IconUserPlus className="h-6 w-6" />
        </div>
      }
    >
      Friends
    </Toolbar>
  );
};

export default FriendsToolbar;
