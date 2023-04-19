import { Link, useLocation } from 'react-router-dom';
import IChannel from '../../../types/channel/Channel';

type SidebarChannelProps = {
  guildId: string;
  channel: IChannel;
  hidden: boolean;
};

const SidebarChannel = ({ guildId, channel, hidden }: SidebarChannelProps) => {
  const location = useLocation().pathname;
  const currentChannelId = location.substring(location.lastIndexOf('/') + 1);
  const isSelected = currentChannelId === channel.id;

  return (
    <li className={hidden && !isSelected ? 'hidden' : ''}>
      <Link
        to={`/channels/${guildId}/${channel.id}`}
        className={`mx-2 mb-0.5 flex items-center gap-2 rounded px-2 py-0.5 font-medium text-silvergrey-300 last-of-type:mb-0 ${
          isSelected ? 'bg-background-100' : ''
        }`}
      >
        <span className="text-lg text-silvergrey-400">#</span>
        <span className={isSelected ? 'font-semibold text-white' : ''}>
          {channel.name}
        </span>
      </Link>
    </li>
  );
};

export default SidebarChannel;
