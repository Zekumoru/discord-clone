import { IconChevronRight } from '../../../../../assets/icons';
import { useScreenModal } from '../../../../../contexts/screen-modal/ScreenModalContext';
import InsetListItem from '../../../../modal-utils/InsetListItem';
import EditPasswordModal from './EditPasswordModal';

const EditPasswordListItem = () => {
  const [openModal, closeModal] = useScreenModal();

  return (
    <InsetListItem
      onClick={() => {
        openModal(<EditPasswordModal close={closeModal} />);
      }}
      className="ml-auto font-medium"
      prefix={<span className="text-white">Password</span>}
      postfix={<IconChevronRight className="h-4 w-4" strokeWidth={3} />}
    />
  );
};

export default EditPasswordListItem;
