import { IconChevronRight } from '../../../../../assets/icons';
import { useModal } from '../../../../../contexts/modal/ModalContext';
import InsetListItem from '../../../../modal-utils/InsetListItem';
import EditPasswordModal from './EditPasswordModal';

const EditPasswordListItem = () => {
  const [openModal] = useModal();

  return (
    <InsetListItem
      onClick={() => {
        openModal(<EditPasswordModal />);
      }}
      className="ml-auto font-medium"
      prefix={<span className="text-white">Password</span>}
      postfix={<IconChevronRight className="h-4 w-4" strokeWidth={3} />}
    />
  );
};

export default EditPasswordListItem;
