import { usePartialModal } from '../../../../contexts/partial-screen-modal/PartialScreenModalContext';
import ModalToolbar from '../../../../contexts/modal/components/ModalToolbar';
import ModalChevronCloseButton from '../../../modal-utils/ModalChevronCloseButton';
import ReorderPartialModal from './reorder-partial-modal/ReorderPartialModal';

const ChannelsModalToolbar = () => {
  const [openPartialModal] = usePartialModal();

  const openReorderPartialModal = () => {
    openPartialModal(<ReorderPartialModal />);
  };

  return (
    <ModalToolbar
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
    </ModalToolbar>
  );
};

export default ChannelsModalToolbar;
