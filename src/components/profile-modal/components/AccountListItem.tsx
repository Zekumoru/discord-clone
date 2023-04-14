import { IconChevronRight, IconUserCircle } from '../../../assets/icons';
import { useScreenModal } from '../../../contexts/screen-modal/ScreenModalContext';
import InsetListItem from '../../modal-utils/InsetListItem';
import AccountModal from './account-modal/AccountModal';

const AccountListItem = () => {
  const [openModal, closeModal] = useScreenModal();

  const handleOpenAccountModal = () => {
    openModal(<AccountModal close={closeModal} />);
  };

  return (
    <InsetListItem
      onClick={handleOpenAccountModal}
      prefix={<IconUserCircle className="h-6 w-6 text-silvergrey-600" />}
      postfix={<IconChevronRight className="ml-auto h-4 w-4" strokeWidth={3} />}
    >
      Account
    </InsetListItem>
  );
};

export default AccountListItem;
