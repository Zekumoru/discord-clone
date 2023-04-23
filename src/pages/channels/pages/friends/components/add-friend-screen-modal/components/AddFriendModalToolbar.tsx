import ModalCloseButton from '../../../../../../../components/modal-utils/ModalCloseButton';
import ScreenModalToolbar from '../../../../../../../contexts/modal/components/ScreenModalToolbar';

const AddFriendModalToolbar = () => {
  return (
    <ScreenModalToolbar leftElement={<ModalCloseButton />}>
      Add Friend
    </ScreenModalToolbar>
  );
};

export default AddFriendModalToolbar;
