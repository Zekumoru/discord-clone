import { toast } from 'react-toastify';
import { useModal } from '../../../../contexts/modal/ModalContext';
import InsetListItem from '../../../modal-utils/InsetListItem';
import DeleteGuildModal from '../delete-guild-modal/DeleteGuildModal';

type DeleteGuildListItemProps = {
  guildId: string | undefined;
};

const DeleteGuildListItem = ({ guildId }: DeleteGuildListItemProps) => {
  const [openModal] = useModal();

  const openDeleteGuildModal = () => {
    if (!guildId) {
      toast.error('Error opening delete modal!');
      return;
    }

    openModal(<DeleteGuildModal guildId={guildId} />);
  };

  return (
    <InsetListItem
      onClick={openDeleteGuildModal}
      className="mx-auto text-salmon-400"
    >
      Delete Server
    </InsetListItem>
  );
};

export default DeleteGuildListItem;
