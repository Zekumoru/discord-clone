import { toast } from 'react-toastify';
import { IconChannels, IconChevronRight } from '../../../assets/icons';
import { useScreenModal } from '../../../contexts/screen-modal/ScreenModalContext';
import InsetListItem from '../../modal-utils/InsetListItem';
import ChannelsModal from './channels-modal/ChannelsModal';

type ChannelsListItemProps = {
  categoriesId: string | undefined;
};

const ChannelsListItem = ({ categoriesId }: ChannelsListItemProps) => {
  const [openModal, closeModal] = useScreenModal();

  const openChannelsModal = () => {
    if (!categoriesId) {
      toast.error('Could not open channels modal!');
      return;
    }

    openModal(<ChannelsModal categoriesId={categoriesId} close={closeModal} />);
  };

  return (
    <InsetListItem
      onClick={openChannelsModal}
      className="text-white"
      prefix={<IconChannels className="h-6 w-6 text-silvergrey-400" />}
      postfix={<IconChevronRight className="ml-auto h-4 w-4" strokeWidth={3} />}
    >
      Channels
    </InsetListItem>
  );
};

export default ChannelsListItem;
