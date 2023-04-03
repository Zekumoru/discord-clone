import { IconChatBubble } from '../../../../../../assets/icons';
import IFriend from '../../../../../../types/friend/Friend';
import CircledIconButton from '../CircledIconButton';
import FriendItem from './FriendItem';

type UserFriendItemProps = {
  friend: IFriend;
};

const UserFriendItem = ({ friend }: UserFriendItemProps) => {
  return (
    <FriendItem
      friend={friend}
      buttons={
        <CircledIconButton icon={<IconChatBubble className="h-4 w-4" />} />
      }
    />
  );
};

export default UserFriendItem;
