import InsetListItem from '../../modal-utils/InsetListItem';
import { IconChevronRight, IconInformationCircle } from '../../../assets/icons';
import { useScreenModal } from '../../../contexts/screen-modal/ScreenModalContext';
import OverviewModal from './overview-modal/OverviewModal';

const OverviewListItem = () => {
  const [openModal, closeModal] = useScreenModal();

  const openOverviewModal = () => {
    openModal(<OverviewModal close={closeModal} />);
  };

  return (
    <InsetListItem
      onClick={openOverviewModal}
      className="text-white"
      prefix={
        <IconInformationCircle
          className="h-6 w-6 text-silvergrey-400"
          strokeWidth={2}
        />
      }
      postfix={<IconChevronRight className="ml-auto h-4 w-4" strokeWidth={3} />}
    >
      Overview
    </InsetListItem>
  );
};

export default OverviewListItem;
