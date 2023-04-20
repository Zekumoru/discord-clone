import { ScreenModalProps } from '../../../../contexts/screen-modal/ScreenModalContext';
import ScreenModalToolbar from '../../../../contexts/screen-modal/components/ScreenModalToolbar';
import ModalChevronCloseButton from '../../../modal-utils/ModalChevronCloseButton';

const OverviewModalToolbar = ({ close }: ScreenModalProps) => {
  return (
    <ScreenModalToolbar
      leftElement={
        <ModalChevronCloseButton close={close}>
          Server Settings
        </ModalChevronCloseButton>
      }
    >
      Overview
    </ScreenModalToolbar>
  );
};

export default OverviewModalToolbar;
