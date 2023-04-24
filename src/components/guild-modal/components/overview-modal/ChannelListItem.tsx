import IChannel from '../../../../types/channel/Channel';

type ChannelListItemProps = {
  channel: IChannel;
  onClick?: (channelId: string) => void;
};

const ChannelListItem = ({ channel, onClick }: ChannelListItemProps) => {
  return (
    <li
      onClick={() => onClick?.(channel.id)}
      className="flex items-center bg-background-300 px-4 py-2.5 font-medium"
    >
      <span className="mr-2.5 text-xl text-silvergrey-300">#</span>
      <span className="truncate">{channel.name}</span>
    </li>
  );
};

export default ChannelListItem;
