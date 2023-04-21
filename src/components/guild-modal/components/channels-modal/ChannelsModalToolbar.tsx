import { usePartialScreenModal } from '../../../../contexts/partial-screen-modal/PartialScreenModalContext';
import { ScreenModalProps } from '../../../../contexts/screen-modal/ScreenModalContext';
import ScreenModalToolbar from '../../../../contexts/screen-modal/components/ScreenModalToolbar';
import ModalChevronCloseButton from '../../../modal-utils/ModalChevronCloseButton';
import ReorderPartialModal from './reorder-partial-modal/ReorderPartialModal';

type ChannelsModalToolbarProps = {
  categoriesId: string;
} & ScreenModalProps;

const ChannelsModalToolbar = ({
  categoriesId,
  close,
}: ChannelsModalToolbarProps) => {
  const [openPartialModal, closePartialModal] = usePartialScreenModal();

  const openReorderPartialModal = () => {
    openPartialModal(
      <ReorderPartialModal categoriesId={categoriesId} close={close} />
    );
  };

  return (
    <ScreenModalToolbar
      leftElement={
        <ModalChevronCloseButton close={close}>
          Server Settings
        </ModalChevronCloseButton>
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
