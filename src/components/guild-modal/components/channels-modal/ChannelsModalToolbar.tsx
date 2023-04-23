import { usePartialModal } from '../../../../contexts/partial-screen-modal/PartialScreenModalContext';
import ScreenModalToolbar from '../../../../contexts/modal/components/ScreenModalToolbar';
import ModalChevronCloseButton from '../../../modal-utils/ModalChevronCloseButton';
import ReorderPartialModal from './reorder-partial-modal/ReorderPartialModal';

const ChannelsModalToolbar = () => {
  const [openPartialModal] = usePartialModal();

  const openReorderPartialModal = () => {
    openPartialModal(<ReorderPartialModal />);
  };

  return (
    <ScreenModalToolbar
      leftElement={
        <ModalChevronCloseButton>Server Settings</ModalChevronCloseButton>
      }
      rightElement={
        <button
          onClick={openReorderPartialModal}
          className="font-semibold text-silvergrey-100"
        >
          Reorder
        </button>
      }
    >
      Channels
    </ScreenModalToolbar>
  );
};

export default ChannelsModalToolbar;
