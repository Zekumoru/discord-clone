import ScreenModalToolbar from '../../../../contexts/modal/components/ScreenModalToolbar';
import ModalChevronCloseButton from '../../../modal-utils/ModalChevronCloseButton';

type OverviewModalToolbarProps = {
  showSaveBtn?: boolean;
  onSave?: () => void;
};

const OverviewModalToolbar = ({
  showSaveBtn,
  onSave,
}: OverviewModalToolbarProps) => {
  return (
    <ScreenModalToolbar
      leftElement={
        <ModalChevronCloseButton>Server Settings</ModalChevronCloseButton>
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
