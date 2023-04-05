import { useNavigate } from 'react-router-dom';
import { IconChatBubble } from '../../../../../../assets/icons';
import IFriend from '../../../../../../types/friend/Friend';
import CircledIconButton from '../CircledIconButton';
import FriendItem from './FriendItem';

type UserFriendItemProps = {
  friend: IFriend;
};

const UserFriendItem = ({ friend }: UserFriendItemProps) => {
  const navigate = useNavigate();

  const handleGotoChat = () => {
    navigate(`/channels/@me/${friend.chatId}`);
  };

  return (
    <FriendItem
      friendId={friend.userId}
      buttons={
        <CircledIconButton
          onClick={handleGotoChat}
          icon={<IconChatBubble className="h-4 w-4" />}
        />
      }
    />
  );
};

export default UserFriendItem;
