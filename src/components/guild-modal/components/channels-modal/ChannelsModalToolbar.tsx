import { ScreenModalProps } from '../../../../contexts/screen-modal/ScreenModalContext';
import ScreenModalToolbar from '../../../../contexts/screen-modal/components/ScreenModalToolbar';
import ModalChevronCloseButton from '../../../modal-utils/ModalChevronCloseButton';

const ChannelsModalToolbar = ({ close }: ScreenModalProps) => {
  return (
    <ScreenModalToolbar
      leftElement={
        <ModalChevronCloseButton close={close}>
          Server Settings
        </ModalChevronCloseButton>
      }
      rightElement={
        <button className="font-semibold text-silvergrey-100">Reorder</button>
      }
    >
      Channels
    </ScreenModalToolbar>
  );
};

export default ChannelsModalToolbar;
