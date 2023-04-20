import { IconChannels, IconChevronRight } from '../../../assets/icons';
import InsetListItem from '../../modal-utils/InsetListItem';

const ChannelsListItem = () => {
  return (
    <InsetListItem
      className="text-white"
      prefix={<IconChannels className="h-6 w-6 text-silvergrey-400" />}
      postfix={<IconChevronRight className="ml-auto h-4 w-4" strokeWidth={3} />}
    >
      Channels
    </InsetListItem>
  );
};

export default ChannelsListItem;
