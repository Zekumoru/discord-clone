import { useCurrentUser } from '../../../../contexts/current-user/CurrentUserContext';
import ChatInput from './components/ChatInput';
import { ReactNode, useState } from 'react';
import useSendMessage from './hooks/useSendMessage';
import { useIsOpenMembersSlider } from '../../../../contexts/members-slider/MembersSliderContext';
import { toast } from 'react-toastify';

type Chat = {
  type: 'chat';
  chatId: string | undefined;
};

type Channel = {
  type: 'channel';
  channelId: string | undefined;
};

type ChatProps = {
  children: ReactNode;
  placeholder?: string;
  disabled?: boolean;
} & (Chat | Channel);

const Chat = (props: ChatProps) => {
  const { type, children, placeholder, disabled } = props;
  const [currentUser] = useCurrentUser();
  const isOpenMembersSlide = useIsOpenMembersSlider();
  const [input, setInput] = useState('');
  const { mutate: sendMessage } = useSendMessage();

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    if (!currentUser) {
      toast.error('User is not logged in!');
      return;
    }

    if (type === 'chat') {
      const chatId = props.chatId;
      if (!chatId) {
        toast.error('Could not send message!');
        return;
      }

      sendMessage({
        type,
        chatId,
        userId: currentUser.id,
        content: input,
      });
    } else {
      const channelId = props.channelId;
      if (!channelId) {
        toast.error('Could not send message!');
        return;
      }

      sendMessage({
        type,
        channelId,
        userId: currentUser.id,
        content: input,
      });
    }

    setInput('');
  };

  return (
    <div className="flex">
      <div
        className={`relative flex-1 ${isOpenMembersSlide ? '-left-80' : ''}`}
      >
        {children}

        <ChatInput
          className={`${
            isOpenMembersSlide ? '!-left-80 !right-80 !w-full' : ''
          }`}
          value={input}
          onChange={setInput}
          onEnter={handleSendMessage}
          placeholder={placeholder}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default Chat;
