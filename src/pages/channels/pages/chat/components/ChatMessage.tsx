import { format } from 'date-fns';
import IMessage from '../../../../../types/message/Message';
import useUser from '../../../../../types/user/hooks/useUser';
import removeTagFromName from '../../../../../utils/removeTagFromName';
import ProfilePicture from '../../../components/ProfilePicture';

type ChatMessageProps = {
  message: IMessage;
};

const ChatMessage = ({ message }: ChatMessageProps) => {
  const [user] = useUser(message.userId);
  const userName = removeTagFromName(user?.username ?? '');

  const datetime = message.timestamp
    ? format(message.timestamp.toDate(), 'MM/dd/yyyy h:mm a')
    : '';

  return (
    <li className="message mt-2.5 first-of-type:mt-0">
      {datetime !== '' && (
        <>
          <ProfilePicture user={user} />
          <div>
            <div className="font-medium">
              {userName}
              <span className="ml-1.5 text-xs text-silvergrey-400">
                {datetime}
              </span>
            </div>
            <div className="text-silvergrey-100">{message.content}</div>
          </div>
        </>
      )}
    </li>
  );
};

export default ChatMessage;
