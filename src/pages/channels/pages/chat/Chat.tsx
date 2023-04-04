import { useParams } from 'react-router-dom';
import Toolbar from '../../components/Toolbar';
import useUser from '../../../../types/user/hooks/useUser';
import useChat from '../../../../types/chat/hooks/useChat';
import { useCurrentUser } from '../../../../contexts/current-user/CurrentUserContext';
import ChatInput from './components/ChatInput';
import removeTagFromName from '../../../../utils/removeTagFromName';
import { useState } from 'react';

const Chat = () => {
  const { id } = useParams();
  const [user] = useCurrentUser();
  const [chat] = useChat(id);
  let friendId: string | undefined;
  if (chat && user) {
    friendId = chat.participants.filter(
      (participant) => participant.userId !== user.id
    )[0].userId;
  }
  const [friend] = useUser(friendId);
  const friendName = removeTagFromName(friend?.username ?? '');
  const [input, setInput] = useState('');

  return (
    <div>
      <Toolbar prefix={<span className="text-silvergrey-400">@</span>}>
        {friendName}
      </Toolbar>

      <ChatInput
        value={input}
        onChange={setInput}
        onEnter={() => {
          console.log(input);
          setInput('');
        }}
        placeholder={`Message @${friendName}`}
      />
    </div>
  );
};

export default Chat;
