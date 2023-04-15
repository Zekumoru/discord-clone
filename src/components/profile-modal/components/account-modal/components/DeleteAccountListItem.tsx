import { useScreenModal } from '../../../../../contexts/screen-modal/ScreenModalContext';
import InsetListItem from '../../../../modal-utils/InsetListItem';
import DeleteAccountModal from './DeleteAccountModal';

const DeleteAccountListItem = () => {
  const [openModal, closeModal] = useScreenModal();

  return (
    <InsetListItem
      onClick={() => {
        openModal(<DeleteAccountModal close={closeModal} />);
      }}
      className="text-salmon-400"
    >
      Delete Account
    </InsetListItem>
  );
};

export default DeleteAccountListItem;
