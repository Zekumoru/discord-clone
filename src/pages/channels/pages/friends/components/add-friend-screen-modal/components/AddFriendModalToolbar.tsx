import ModalCloseButton from '../../../../../../../components/modal-utils/ModalCloseButton';
import ScreenModalToolbar from '../../../../../../../contexts/screen-modal/components/ScreenModalToolbar';
import { ScreenModalMethods } from '../../../../../../../contexts/screen-modal/ScreenModalContext';

type AddFriendModalToolbarProps = {
  close: ScreenModalMethods[1];
};

const AddFriendModalToolbar = ({ close }: AddFriendModalToolbarProps) => {
  return (
    <ScreenModalToolbar leftElement={<ModalCloseButton close={close} />}>
      Add Friend
    </ScreenModalToolbar>
  );
};

export default AddFriendModalToolbar;
