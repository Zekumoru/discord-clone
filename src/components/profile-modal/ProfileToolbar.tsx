import { useCloseModal } from '../../contexts/modal/ModalContext';
import ScreenModalToolbar from '../../contexts/modal/components/ScreenModalToolbar';
import ModalCloseButton from '../modal-utils/ModalCloseButton';

const ProfileToolbar = () => {
  return (
    <ScreenModalToolbar leftElement={<ModalCloseButton />}>
      Overview
    </ScreenModalToolbar>
  );
};

export default ProfileToolbar;
