import ModalToolbar from '../../../../contexts/modal/components/ModalToolbar';
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
    <ModalToolbar
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
    </ModalToolbar>
  );
};

export default OverviewModalToolbar;
