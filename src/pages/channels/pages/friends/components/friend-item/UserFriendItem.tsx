import { useNavigate } from 'react-router-dom';
import { IconChatBubble } from '../../../../../../assets/icons';
import IFriend from '../../../../../../types/friend/Friend';
import CircledIconButton from '../CircledIconButton';
import FriendItem from './FriendItem';
import useUserChatId from '../../../../../../types/user-chat/hooks/useUserChatId';
import { useCurrentUser } from '../../../../../../contexts/current-user/CurrentUserContext';

type UserFriendItemProps = {
  friend: IFriend;
  onClick?: () => void;
};

const UserFriendItem = ({ friend, onClick }: UserFriendItemProps) => {
  const navigate = useNavigate();
  const [user] = useCurrentUser();
  const [chatId] = useUserChatId(user?.userChatsId, friend.userId);

  const handleGotoChat = () => {
    if (chatId === undefined) return;

    navigate(`/channels/@me/${chatId}`);
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
