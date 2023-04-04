import useMessages from '../hooks/useMessages';
import ChatMessage from './ChatMessage';

type ChatMessagesProps = {
  chatId: string | undefined;
};

const ChatMessages = ({ chatId }: ChatMessagesProps) => {
  const [messages] = useMessages(chatId);

  return (
    <div className="mb-12 p-4">
      <ul>
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </ul>
    </div>
  );
};

export default ChatMessages;
