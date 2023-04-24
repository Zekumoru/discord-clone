import { IconDragDots } from '../../../../../assets/icons';
import IChannel from '../../../../../types/channel/Channel';

type ChannelItemProps = {
  channel: IChannel;
};

const ChannelItem = ({ channel }: ChannelItemProps) => {
  return (
    <div key={channel.id} className="li-rule-2 flex items-center">
      <div className="ml-4 mr-3 text-lg font-bold text-silvergrey-600">#</div>

      <div className="li-rule-2-b flex flex-1 items-center overflow-hidden py-2.5 pr-4">
        <div className="truncate font-semibold text-silvergrey-100">
          {channel.name}
        </div>

        <IconDragDots className="ml-auto h-6 w-6 flex-shrink-0 text-silvergrey-600" />
      </div>
    </div>
  );
};

export default ChannelItem;
