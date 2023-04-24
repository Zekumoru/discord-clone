import InsetListItem from '../../modal-utils/InsetListItem';
import { IconChevronRight, IconUsers } from '../../../assets/icons';
import { useModal } from '../../../contexts/modal/ModalContext';
import MembersModal from './members-modal/MembersModal';

type MembersListItemProps = {
  membersId: string | undefined;
};

const MembersListItem = ({ membersId }: MembersListItemProps) => {
  const [openModal] = useModal();

  const openMembersModal = () => {
    openModal(<MembersModal membersId={membersId} />);
  };

  return (
    <InsetListItem
      className="text-white"
      onClick={openMembersModal}
      prefix={<IconUsers className="h-6 w-6 text-silvergrey-400" />}
      postfix={<IconChevronRight className="ml-auto h-4 w-4" strokeWidth={3} />}
    >
      Members
    </InsetListItem>
  );
};

export default MembersListItem;
