import ModalCloseButton from '../../../../../../../components/modal-utils/ModalCloseButton';
import ModalToolbar from '../../../../../../../contexts/modal/components/ModalToolbar';

const AddFriendModalToolbar = () => {
  return (
    <ModalToolbar leftElement={<ModalCloseButton />}>Add Friend</ModalToolbar>
  );
};

export default AddFriendModalToolbar;
