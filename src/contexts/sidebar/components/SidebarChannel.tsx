import { useLocation } from 'react-router-dom';
import IChannel from '../../../types/channel/Channel';

type SidebarChannelProps = {
  channel: IChannel;
};

const SidebarChannel = ({ channel }: SidebarChannelProps) => {
  const location = useLocation().pathname;
  const channelId = location.substring(location.lastIndexOf('/') + 1);
  const isSelected = channelId === channel.id;

  return (
    <li
      className={`mx-2 mb-0.5 flex items-center gap-2 rounded px-2 py-0.5 font-medium text-silvergrey-300 last-of-type:mb-0 ${
        isSelected ? 'bg-background-100' : ''
      }`}
    >
      <span className="text-lg text-silvergrey-400">#</span>
      <span className={isSelected ? 'font-semibold text-white' : ''}>
        {channel.name}
      </span>
    </li>
  );
};

export default SidebarChannel;
