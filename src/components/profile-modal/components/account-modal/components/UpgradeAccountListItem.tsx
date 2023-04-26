import { useModal } from '../../../../../contexts/modal/ModalContext';
import InsetListItem from '../../../../modal-utils/InsetListItem';
import UpgradeAccountModal from './UpgradeAccountModal';

const UpgradeAccountListItem = () => {
  const [openModal] = useModal();

  return (
    <InsetListItem
      onClick={() => {
        openModal(<UpgradeAccountModal />);
      }}
    >
      Upgrade Account
    </InsetListItem>
  );
};

export default UpgradeAccountListItem;
