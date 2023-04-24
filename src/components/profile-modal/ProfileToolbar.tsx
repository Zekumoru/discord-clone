import { useCloseModal } from '../../contexts/modal/ModalContext';
import ModalToolbar from '../../contexts/modal/components/ModalToolbar';
import ModalCloseButton from '../modal-utils/ModalCloseButton';

const ProfileToolbar = () => {
  return (
    <ModalToolbar leftElement={<ModalCloseButton />}>Overview</ModalToolbar>
  );
};

export default ProfileToolbar;
