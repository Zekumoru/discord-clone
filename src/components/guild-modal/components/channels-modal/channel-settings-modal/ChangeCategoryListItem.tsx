import { toast } from 'react-toastify';
import { IconFolderPlus } from '../../../../../assets/icons';
import { useScreenModal } from '../../../../../contexts/screen-modal/ScreenModalContext';
import InsetChevronListItem from '../../../../modal-utils/InsetChevronListItem';
import ChangeCategoryModal from './ChangeCategoryModal';
import IChannel from '../../../../../types/channel/Channel';

type ChangeCategoryListItemProps = {
  channel: IChannel;
  categoryName: string | undefined;
};

const ChangeCategoryListItem = ({
  channel,
  categoryName,
}: ChangeCategoryListItemProps) => {
  const [openModal, closeModal] = useScreenModal();

  const openChangeCategoryModal = () => {
    if (!categoryName) {
      toast.error('Could not open modal!');
      return;
    }

    openModal(
      <ChangeCategoryModal
        channel={channel}
        categoryName={categoryName}
        close={closeModal}
      />
    );
  };

  return (
    <InsetChevronListItem
      onClick={openChangeCategoryModal}
      labelPrefix={<IconFolderPlus className="h-6 w-6 text-silvergrey-400" />}
      label="Category"
      value={categoryName}
    />
  );
};

export default ChangeCategoryListItem;
