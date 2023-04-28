import { format } from 'date-fns';
import IUser from '../../../../../types/user/User';
import extractNameAndTag from '../../../../../utils/extractNameAndTag';
import ProfilePicture from '../../../components/ProfilePicture';
import useMessages from '../hooks/useMessages';
import ChatMessage from './ChatMessage';
import ChatMessagesList from './ChatMessagesList';

type ChatMessagesProps = {
  user: IUser | undefined;
  chatId: string | undefined;
};

const ChatMessages = ({ user, chatId }: ChatMessagesProps) => {
  const { messages, isEndOfChat, loadMoreMessages } = useMessages(
    'chat',
    chatId
  );
  const [name] = extractNameAndTag(user?.username ?? '');

  return (
    <div className="h-screen-toolbar flex flex-col justify-end py-4">
      {isEndOfChat && (
        <div className="px-4">
          <ProfilePicture user={user} className="mb-2 h-20 w-20" />

          <h2 className="text-2xl font-bold">{name}</h2>

          <p className="text-silvergrey-300">
            This is the beginning of your direct message history with{' '}
            <span className="font-semibold">{name}</span>.
          </p>
        </div>
      )}
      <ChatMessagesList
        id={chatId}
        messages={messages}
        loadMoreMessagesFn={loadMoreMessages}
        isEndOfChat={isEndOfChat}
      />
    </div>
  );
};

export default ChatMessages;
