import { useModal } from '../../../../../contexts/modal/ModalContext';
import InsetListItem from '../../../../modal-utils/InsetListItem';
import DeleteAccountModal from './DeleteAccountModal';

const DeleteAccountListItem = () => {
  const [openModal] = useModal();

  return (
    <InsetListItem
      onClick={() => {
        openModal(<DeleteAccountModal />);
      }}
      className="text-salmon-400"
    >
      Delete Account
    </InsetListItem>
  );
};

export default DeleteAccountListItem;
