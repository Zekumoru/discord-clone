import ScreenModalToolbar from '../../contexts/screen-modal/components/ScreenModalToolbar';
import ModalCloseButton from '../modal-utils/ModalCloseButton';
import { ScreenModalMethods } from '../../contexts/screen-modal/ScreenModalContext';

type ProfileToolbarProps = {
  close: ScreenModalMethods[1];
};

const ProfileToolbar = ({ close }: ProfileToolbarProps) => {
  return (
    <ScreenModalToolbar leftElement={<ModalCloseButton close={close} />}>
      Overview
    </ScreenModalToolbar>
  );
};

export default ProfileToolbar;
