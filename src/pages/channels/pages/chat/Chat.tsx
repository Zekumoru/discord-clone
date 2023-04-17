import { useNavigate, useParams } from 'react-router-dom';
import { useCurrentUser } from '../../../../contexts/current-user/CurrentUserContext';
import ChatInput from './components/ChatInput';
import { useEffect, useState } from 'react';
import useSendMessage from './hooks/useSendMessage';
import ChatMessages from './components/ChatMessages';
import ChatToolbar from './components/ChatToolbar';
import { usePartialScreenModal } from '../../../../contexts/partial-screen-modal/PartialScreenModalContext';
import UserPartialModal from '../../../../components/user-partial-modal/UserPartialModal';
import {
  useIsOpenMembersSlider,
  useMembersSlider,
} from '../../../../contexts/members-slider/MembersSliderContext';
import extractNameAndTag from '../../../../utils/extractNameAndTag';
import useOwnsChat from './hooks/useOwnsChat';
import useFriend from './hooks/useFriend';
import useChat from '../../../../types/chat/hooks/useChat';

type ChatProps = {};

const Chat = ({}: ChatProps) => {
  const { id: chatId } = useParams();
  const [currentUser] = useCurrentUser();
  const [openPartialModal, closePartialModal] = usePartialScreenModal();
  const [openMembersSlider] = useMembersSlider();
  const isOpenMembersSlide = useIsOpenMembersSlider();
  const [ownsChat, loading] = useOwnsChat(chatId);
  const [chat] = useChat(chatId);
  const [friend] = useFriend(currentUser, chatId);
  const [friendName] = extractNameAndTag(friend?.username ?? '');
  const [input, setInput] = useState('');
  const { mutate: sendMessage } = useSendMessage();
  const navigate = useNavigate();

  useEffect(() => {
    if (ownsChat === undefined) return;
    if (ownsChat) return;

    navigate('/channels/@me');
  }, [ownsChat]);

  const handleSendMessage = () => {
    sendMessage({
      userId: currentUser!.id,
      chatId: chatId!,
      content: input,
    });
    setInput('');
  };

  const handleOpenMembersSlider = () => {
    openMembersSlider({
      titlePrefix: '@',
      title: friendName,
      members: chat?.participants ?? [],
    });
  };

  const handleOpenUserPartialModal = () => {
    openPartialModal(
      !!friend && (
        <UserPartialModal userId={friend.id} close={closePartialModal} />
      )
    );
  };

  return (
    <div className="flex">
      <div
        className={`relative flex-1 ${isOpenMembersSlide ? '-left-80' : ''}`}
      >
        <ChatToolbar onOpenMembersSlider={handleOpenMembersSlider} prefix="@">
          <span onClick={handleOpenUserPartialModal}>{friendName}</span>
        </ChatToolbar>

        {ownsChat && <ChatMessages user={friend} chatId={chatId} />}

        <ChatInput
          className={`${
            isOpenMembersSlide ? '!-left-80 !right-80 !w-full' : ''
          }`}
          value={input}
          onChange={setInput}
          onEnter={handleSendMessage}
          placeholder={`Message @${friendName}`}
          disabled={loading || !ownsChat}
        />
      </div>

      <div className="xl:w-80" />
    </div>
  );
};

export default Chat;
