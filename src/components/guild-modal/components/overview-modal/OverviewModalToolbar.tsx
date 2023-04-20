import { ScreenModalProps } from '../../../../contexts/screen-modal/ScreenModalContext';
import ScreenModalToolbar from '../../../../contexts/screen-modal/components/ScreenModalToolbar';
import ModalChevronCloseButton from '../../../modal-utils/ModalChevronCloseButton';

type OverviewModalToolbarProps = {
  showSaveBtn?: boolean;
  onSave?: () => void;
} & ScreenModalProps;

const OverviewModalToolbar = ({
  showSaveBtn,
  close,
  onSave,
}: OverviewModalToolbarProps) => {
  return (
    <ScreenModalToolbar
      leftElement={
        <ModalChevronCloseButton close={close}>
          Server Settings
        </ModalChevronCloseButton>
      }
      rightElement={
        showSaveBtn && (
          <button
            type="button"
            onClick={onSave}
            className="font-medium text-white"
          >
            Save
          </button>
        )
      }
    >
      Overview
    </ScreenModalToolbar>
  );
};

export default OverviewModalToolbar;
