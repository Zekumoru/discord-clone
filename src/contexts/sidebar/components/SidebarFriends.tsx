import { useNavigate } from 'react-router-dom';
import { IconUserBars } from '../../../assets/icons';
import { PartialScreenModalMethods } from '../../partial-screen-modal/PartialScreenModalContext';
import useUserChats from '../../../types/user-chat/hooks/useUserChats';
import { useCurrentUser } from '../../current-user/CurrentUserContext';
import SidebarFriendItem from './SidebarFriendItem';

type SidebarFriendsProps = {
  close: PartialScreenModalMethods[1];
};

const SidebarFriends = ({ close }: SidebarFriendsProps) => {
  const [user] = useCurrentUser();
  const [userChats] = useUserChats(user?.userChatsId);
  const navigate = useNavigate();

  const handleGoToFriendsPage = () => {
    navigate('/channels/@me');
    close();
  };

  return (
    <div className="overflow-x-hidden px-3 py-4 font-medium text-silvergrey-400">
      <div
        onClick={handleGoToFriendsPage}
        className="mb-4 flex items-center gap-3 p-2"
      >
        <div className="grid h-9 w-9 place-items-center rounded-full bg-background-100 text-white">
          <IconUserBars className="h-6 w-6" />
        </div>

        <div>Friends</div>
      </div>

      <div className="heading-2 mb-2 px-2">Direct Messages</div>

      <ul>
        {userChats?.chats.map((chat) => (
          <SidebarFriendItem
            key={chat.userId}
            chatId={chat.chatId}
            friendId={chat.userId}
            close={close}
          />
        ))}
      </ul>
    </div>
  );
};

export default SidebarFriends;