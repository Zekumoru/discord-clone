import { format } from 'date-fns';
import IMessage from '../../../../../types/message/Message';
import useUser from '../../../../../types/user/hooks/useUser';
import removeTagFromName from '../../../../../utils/removeTagFromName';
import ProfilePicture from '../../../components/ProfilePicture';
import useUserPartialModal from '../../../../../components/user-partial-modal/hooks/useUserPartialModal';

type ChatMessageProps = {
  message: IMessage;
};

const ChatMessage = ({ message }: ChatMessageProps) => {
  const [user] = useUser(message.userId);
  const [openUserPartialModal] = useUserPartialModal();

  const userName = removeTagFromName(user?.username ?? '');
  const datetime = message.timestamp
    ? format(message.timestamp.toDate(), 'MM/dd/yyyy h:mm a')
    : '';

  const handleOpenUserPartialModal = () => {
    openUserPartialModal(user?.id);
  };

  return (
    <li className="message mt-2.5 first-of-type:mt-0">
      {datetime !== '' && (
        <>
          <ProfilePicture user={user} onClick={handleOpenUserPartialModal} />
          <div className="hidden-x-auto min-w-0">
            <div className="flex min-w-0 items-center font-medium">
              <div className="truncate" onClick={handleOpenUserPartialModal}>
                {userName}
              </div>
              <div className="ml-1.5 flex-shrink-0 text-xs text-silvergrey-400">
                {datetime}
              </div>
            </div>

            <div className="text-silvergrey-100">{message.content}</div>
          </div>
        </>
      )}
    </li>
  );
};

export default ChatMessage;
