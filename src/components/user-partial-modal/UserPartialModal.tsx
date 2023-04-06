import { PartialScreenModalMethods } from '../../contexts/partial-screen-modal/PartialScreenModalContext';
import useUser from '../../types/user/hooks/useUser';
import { useCurrentUser } from '../../contexts/current-user/CurrentUserContext';
import useUserChatId from '../../types/user-chat/hooks/useUserChatId';
import { useNavigate } from 'react-router-dom';
import UserPartialModalBanner from './components/UserPartialModalBanner';
import InfoAndActions from './components/InfoAndActions';
import AdditionalInfo from './components/AdditionalInfo';

type UserPartialModalProps = {
  userId: string;
  close: PartialScreenModalMethods[1];
};

const UserPartialModal = ({ userId, close }: UserPartialModalProps) => {
  const [currentUser] = useCurrentUser();
  const [user] = useUser(userId);
  const [chatId] = useUserChatId(currentUser?.userChatsId, user?.id);
  const navigate = useNavigate();

  const handleMessageIconClick = () => {
    if (chatId === undefined) return;

    close();
    navigate(`/channels/@me/${chatId}`);
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-background-700 bg-opacity-50">
      <div className="min-h-[65vh] w-full flex-1" onClick={close} />

      <div className="mb-3 h-1.5 w-16 rounded bg-silvergrey-300" />

      <div className="min-h-[85vh] w-full overflow-hidden rounded-t-lg bg-background-500">
        <UserPartialModalBanner user={user} />

        <div className="flex flex-col gap-4 p-4">
          <InfoAndActions
            user={user}
            onMessageIconClick={handleMessageIconClick}
          />

          <AdditionalInfo user={user} />
        </div>
      </div>
    </div>
  );
};

export default UserPartialModal;
