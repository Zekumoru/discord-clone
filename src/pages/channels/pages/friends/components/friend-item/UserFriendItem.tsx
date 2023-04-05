import { useNavigate } from 'react-router-dom';
import { IconChatBubble } from '../../../../../../assets/icons';
import IFriend from '../../../../../../types/friend/Friend';
import CircledIconButton from '../CircledIconButton';
import FriendItem from './FriendItem';

type UserFriendItemProps = {
  friend: IFriend;
  onClick?: () => void;
};

const UserFriendItem = ({ friend, onClick }: UserFriendItemProps) => {
  const navigate = useNavigate();

  const handleGotoChat = () => {
    navigate(`/channels/@me/${friend.chatId}`);
  };

  return (
    <FriendItem
      onClick={onClick}
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
