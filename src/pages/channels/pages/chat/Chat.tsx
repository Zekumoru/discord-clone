import { useCurrentUser } from '../../../../contexts/current-user/CurrentUserContext';
import ChatInput from './components/ChatInput';
import { ReactNode, useState } from 'react';
import useSendMessage from './hooks/useSendMessage';
import { useIsOpenMembersSlider } from '../../../../contexts/members-slider/MembersSliderContext';
import { toast } from 'react-toastify';

type ChatProps = {
  children: ReactNode;
  chatId: string | undefined;
  placeholder?: string;
  disabled?: boolean;
};

const Chat = ({ children, placeholder, disabled, chatId }: ChatProps) => {
  const [currentUser] = useCurrentUser();
  const isOpenMembersSlide = useIsOpenMembersSlider();
  const [input, setInput] = useState('');
  const { mutate: sendMessage } = useSendMessage();

  const handleSendMessage = () => {
    if (!currentUser || !chatId) {
      toast.error('Could not send message!');
      return;
    }

    sendMessage({
      userId: currentUser.id,
      chatId: chatId,
      content: input,
    });
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

      <div className="xl:w-80" />
    </div>
  );
};

export default Chat;
