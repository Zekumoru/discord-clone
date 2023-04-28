import ChatInput from './components/ChatInput';
import { ReactNode, useState } from 'react';
import { useIsOpenMembersSlider } from '../../../../contexts/members-slider/MembersSliderContext';
import { useSidebarIsOpen } from '../../../../contexts/sidebar/SidebarContext';
import useHandleSendMessage from './utils/useHandleSendMessage';
import useMembersUsers from '../../../../types/member/hooks/useMembersUsers';
import IUser from '../../../../types/user/User';
import MentionUserItem from './components/MentionUserItem';

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
  const [input, setInput] = useState('');
  const handleSendMessage = useHandleSendMessage(input, {
    ...props,
    onSend: () => setInput(''),
  });
  const [users] = useMembersUsers(membersId);
  const [mentionUsers, setMentionUsers] = useState<IUser[]>([]);
  const [bottomHeight, setBottomHeight] = useState(0);

  const handleInputChange = (input: string) => {
    setInput(input);

    const mention = input
      .match(/(\s|^)@[^@]*$/)?.[0]
      .trimStart()
      .toLowerCase();

    if (!users) return;
    if (mention === undefined) {
      setMentionUsers([]);
      return;
    }

    const name = mention.substring(1);
    setMentionUsers(
      users.filter((user) => user.username.toLowerCase().includes(name))
    );
  };

  return (
    <div className="flex">
      <div
        className={`relative flex-1 ${isOpenMembersSlide ? '-left-80' : ''}`}
      >
        <div style={{ marginBottom: `${bottomHeight}px` }}>{children}</div>

        <div
          className={`md-w-sidebar fixed -bottom-[1px] right-0 w-full ${
            isOpenMembersSlide ? '!-left-80 !right-80 !w-full' : ''
          } ${isSidebarOpen ? '!-right-80 !left-80' : ''}`}
        >
          {mentionUsers.length > 0 && (
            <ul className="mx-4 mb-1 rounded bg-background-500 px-1 py-2 shadow-2xl">
              {mentionUsers.map((user) => (
                <MentionUserItem key={user.id} user={user} />
              ))}
            </ul>
          )}

          <div className="bg-background-300 px-4 pb-4">
            <ChatInput
              value={input}
              onChange={handleInputChange}
              onHeightChange={setBottomHeight}
              onEnter={() => {
                setMentionUsers([]);
                handleSendMessage();
              }}
              placeholder={placeholder}
              disabled={disabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
export type { ChatProps };
