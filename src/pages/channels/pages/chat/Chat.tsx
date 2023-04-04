import { useParams } from 'react-router-dom';
import Toolbar from '../../components/Toolbar';
import useUser from '../../../../types/user/hooks/useUser';
import useChat from '../../../../types/chat/hooks/useChat';
import { useCurrentUser } from '../../../../contexts/current-user/CurrentUserContext';
import ChatInput from './components/ChatInput';
import removeTagFromName from '../../../../utils/removeTagFromName';
import { useState } from 'react';
import useSendMessage from './hooks/useSendMessage';
import ChatMessages from './components/ChatMessages';

const Chat = () => {
  const { id: chatId } = useParams();
  const [user] = useCurrentUser();
  const [chat] = useChat(chatId);
  let friendId: string | undefined;
  if (chat && user) {
    friendId = chat.participants.filter(
      (participant) => participant.userId !== user.id
    )[0].userId;
  }
  const [friend] = useUser(friendId);
  const friendName = removeTagFromName(friend?.username ?? '');
  const [input, setInput] = useState('');
  const { mutate: sendMessage } = useSendMessage();

  const handleSendMessage = () => {
    sendMessage({
      userId: user!.id,
      chatId: chatId!,
      content: input,
    });
    setInput('');
  };

  return (
    <div>
      <Toolbar prefix={<span className="text-silvergrey-400">@</span>}>
        {friendName}
      </Toolbar>

      <ChatMessages chatId={chatId} />

      <ChatInput
        value={input}
        onChange={setInput}
        onEnter={handleSendMessage}
        placeholder={`Message @${friendName}`}
      />
    </div>
  );
};

export default Chat;
