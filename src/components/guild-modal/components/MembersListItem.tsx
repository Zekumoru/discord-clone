import InsetListItem from '../../modal-utils/InsetListItem';
import { IconChevronRight, IconUsers } from '../../../assets/icons';

const MembersListItem = () => {
  return (
    <InsetListItem
      className="text-white"
      prefix={<IconUsers className="h-6 w-6 text-silvergrey-400" />}
      postfix={<IconChevronRight className="ml-auto h-4 w-4" strokeWidth={3} />}
    >
      Members
    </InsetListItem>
  );
};

export default MembersListItem;
