import { useScreenModal } from '../../../../contexts/screen-modal/ScreenModalContext';
import IChannel from '../../../../types/channel/Channel';
import ChannelSettingsModal from './channel-settings-modal/ChannelSettingsModal';

type ChannelListItemProps = {
  channel: IChannel;
};

const ChannelListItem = ({ channel }: ChannelListItemProps) => {
  const [openModal, closeModal] = useScreenModal();

  const openChannelSettingsModal = () => {
    openModal(<ChannelSettingsModal channel={channel} close={closeModal} />);
  };

  return (
    <li
      onClick={openChannelSettingsModal}
      className="li-rule-2 flex items-center"
    >
      <div className="ml-4 mr-3 text-lg font-bold text-silvergrey-600">#</div>

      <div className="li-rule-2-b flex-1 truncate py-2.5 pr-4 font-semibold text-silvergrey-100">
        {channel.name}
      </div>
    </li>
  );
};

export default ChannelListItem;
