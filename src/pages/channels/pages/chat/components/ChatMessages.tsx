import IUser from '../../../../../types/user/User';
import extractNameAndTag from '../../../../../utils/extractNameAndTag';
import ProfilePicture from '../../../components/ProfilePicture';
import useMessages from '../hooks/useMessages';
import ChatMessage from './ChatMessage';

type ChatMessagesProps = {
  user: IUser | undefined;
  chatId: string | undefined;
};

const ChatMessages = ({ user, chatId }: ChatMessagesProps) => {
  const [messages] = useMessages(chatId);
  const [name] = extractNameAndTag(user?.username ?? '');

  return (
    <div className="h-screen-toolbar mb-14 flex flex-col justify-end p-4">
      <div className="mb-2">
        <ProfilePicture user={user} className="mb-2 h-20 w-20" />

        <h2 className="text-2xl font-bold">{name}</h2>

        <p className="text-silvergrey-300">
          This is the beginning of your direct message history with{' '}
          <span className="font-semibold">{name}</span>.
        </p>
      </div>

      {messages && messages.length > 0 && (
        <div className="mb-2.5 border-b-2 border-background-100" />
      )}

      <ul>
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </ul>
    </div>
  );
};

export default ChatMessages;
