import IChannel from '../../../types/channel/Channel';
import ChatMessagesList from '../pages/chat/components/ChatMessagesList';
import useMessages from '../pages/chat/hooks/useMessages';

type ChannelMessagesProps = {
  channel: IChannel | undefined;
};

const ChannelMessages = ({ channel }: ChannelMessagesProps) => {
  const { messages, isEndOfChat, loadMoreMessages } = useMessages(
    'channel',
    channel?.id
  );

  return (
    <div className="h-screen-toolbar flex flex-col justify-end p-4">
      {isEndOfChat && (
        <div>
          <h2 className="text-2xl font-bold">Welcome to #{channel?.name}!</h2>

          <p className="text-silvergrey-300">
            This is the start of the #{channel?.name} channel.
          </p>
        </div>
      )}

      <ChatMessagesList
        messages={messages}
        loadMoreMessagesFn={loadMoreMessages}
        isEndOfChat={isEndOfChat}
      />
    </div>
  );
};

export default ChannelMessages;
