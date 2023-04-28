import { ReactNode, useState } from 'react';
import { useIsOpenMembersSlider } from '../../../../contexts/members-slider/MembersSliderContext';
import { useSidebarIsOpen } from '../../../../contexts/sidebar/SidebarContext';
import useHandleSendMessage from './hooks/useHandleSendMessage';
import useMembersUsers from '../../../../types/member/hooks/useMembersUsers';
import '@draft-js-plugins/mention/lib/plugin.css';
import ChatInput from './components/ChatInput';
import UsersProvider from './contexts/UsersContext';

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
  membersId?: string;
} & (Chat | Channel);

const Chat = (props: ChatProps) => {
  const { children, placeholder, disabled, membersId } = props;
  const isSidebarOpen = useSidebarIsOpen();
  const isOpenMembersSlide = useIsOpenMembersSlider();
  const [users] = useMembersUsers(membersId);
  const [height, setHeight] = useState(0);
  const handleSendMessage = useHandleSendMessage(props);

  return (
    <div className="flex">
      <div
        className={`relative flex-1 ${isOpenMembersSlide ? '-left-80' : ''}`}
      >
        <UsersProvider users={users}>
          <div style={{ marginBottom: `${height}px` }}>{children}</div>
        </UsersProvider>

        <div
          className={`md-w-sidebar fixed -bottom-[1px] right-0 w-full ${
            isOpenMembersSlide ? '!-left-80 !right-80 !w-full' : ''
          } ${isSidebarOpen ? '!-right-80 !left-80' : ''}`}
        >
          {users && (
            <ChatInput
              users={users}
              placeholder={placeholder}
              onEnter={handleSendMessage}
              onChange={({ height }) => setHeight(height)}
              disabled={disabled}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
export type { ChatProps };
