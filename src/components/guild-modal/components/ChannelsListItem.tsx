import { toast } from 'react-toastify';
import { IconChannels, IconChevronRight } from '../../../assets/icons';
import { useModal } from '../../../contexts/modal/ModalContext';
import InsetListItem from '../../modal-utils/InsetListItem';
import ChannelsModal from './channels-modal/ChannelsModal';
import CategoriesIdProvider from '../../../types/category/contexts/CategoriesIdContext';

type ChannelsListItemProps = {
  categoriesId: string | undefined;
};

const ChannelsListItem = ({ categoriesId }: ChannelsListItemProps) => {
  const [openModal] = useModal();

  const openChannelsModal = () => {
    if (!categoriesId) {
      toast.error('Could not open channels modal!');
      return;
    }

    openModal(<ChannelsModal />, (children) => (
      <CategoriesIdProvider categoriesId={categoriesId}>
        {children}
      </CategoriesIdProvider>
    ));
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
