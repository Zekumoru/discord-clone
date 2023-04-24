import { useLocation, useNavigate } from 'react-router-dom';
import ProfilePicture from '../../../pages/channels/components/ProfilePicture';
import useUser from '../../../types/user/hooks/useUser';
import extractNameAndTag from '../../../utils/extractNameAndTag';

type SidebarFriendItemProps = {
  chatId: string;
  friendId: string;
  close: () => void;
};

const SidebarFriendItem = ({
  chatId,
  friendId,
  close,
}: SidebarFriendItemProps) => {
  const [friend] = useUser(friendId);
  const [name] = extractNameAndTag(friend?.username ?? '');
  const location = useLocation().pathname;
  const navigate = useNavigate();

  const currentChatId = location
    .match(/\/@me\/\d+/)?.[0]
    .substring('/@me/'.length);

  const handleGoToChat = () => {
    navigate(`/channels/@me/${chatId}`);
    close();
  };

  return (
    <li
      className={`flex items-center gap-3 rounded px-2.5 py-1.5 ${
        currentChatId === chatId ? 'bg-background-100' : ''
      }`}
      onClick={handleGoToChat}
    >
      <ProfilePicture
        user={friend}
        className="h-9 w-9 shrink-0 text-sm text-white"
      />

      <span
        className={`truncate ${currentChatId === chatId ? 'text-white' : ''}`}
      >
        {name}
      </span>
    </li>
  );
};

export default SidebarFriendItem;
