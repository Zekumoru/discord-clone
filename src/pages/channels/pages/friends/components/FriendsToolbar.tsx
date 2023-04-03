import { IconUserPlus } from '../../../../../assets/icons';
import { useScreenModal } from '../../../../../contexts/screen-modal/ScreenModalContext';
import Toolbar from '../../../components/Toolbar';
import AddFriendScreenModal from './add-friend-screen-modal/AddFriendScreenModal';

const FriendsToolbar = () => {
  const [openModal, closeModal] = useScreenModal();

  return (
    <Toolbar
      buttons={
        <div
          onClick={() => openModal(<AddFriendScreenModal close={closeModal} />)}
        >
          <IconUserPlus className="h-6 w-6" />
        </div>
      }
    >
      Friends
    </Toolbar>
  );
};

export default FriendsToolbar;
