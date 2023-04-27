import { useCurrentUser } from '../../../../contexts/current-user/CurrentUserContext';
import ChatInput from './components/ChatInput';
import { ReactNode, useState } from 'react';
import useSendMessage from './hooks/useSendMessage';
import { useIsOpenMembersSlider } from '../../../../contexts/members-slider/MembersSliderContext';
import { toast } from 'react-toastify';
import { useSidebarIsOpen } from '../../../../contexts/sidebar/SidebarContext';
import useHandleSendMessage from './utils/useHandleSendMessage';

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
  const { children, placeholder, disabled } = props;
  const isSidebarOpen = useSidebarIsOpen();
  const isOpenMembersSlide = useIsOpenMembersSlider();
  const [input, setInput] = useState('');
  const handleSendMessage = useHandleSendMessage(input, {
    ...props,
    onSend: () => setInput(''),
  });

  return (
    <div className="flex">
      <div
        className={`relative flex-1 ${isOpenMembersSlide ? '-left-80' : ''}`}
      >
        {children}

        <div
          className={`md-w-sidebar fixed -bottom-[1px] right-0 w-full bg-background-300 p-4 pt-0 ${
            isOpenMembersSlide ? '!-left-80 !right-80 !w-full' : ''
          } ${isSidebarOpen ? '!-right-80 !left-80' : ''}`}
        >
          <ChatInput
            value={input}
            onChange={setInput}
            onEnter={handleSendMessage}
            placeholder={placeholder}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
export type { ChatProps };
