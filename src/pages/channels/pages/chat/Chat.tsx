import { useNavigate, useParams } from 'react-router-dom';
import useUser from '../../../../types/user/hooks/useUser';
import useChat from '../../../../types/chat/hooks/useChat';
import { useCurrentUser } from '../../../../contexts/current-user/CurrentUserContext';
import ChatInput from './components/ChatInput';
import removeTagFromName from '../../../../utils/removeTagFromName';
import { useEffect, useState } from 'react';
import useSendMessage from './hooks/useSendMessage';
import ChatMessages from './components/ChatMessages';
import ChatToolbar from './components/ChatToolbar';
import MembersSlider from './components/members-slider/MembersSlider';
import useUserChats from '../../../../types/user-chat/hooks/useUserChats';
import { usePartialScreenModal } from '../../../../contexts/partial-screen-modal/PartialScreenModalContext';
import UserPartialModal from '../../../../components/user-partial-modal/UserPartialModal';

const Chat = () => {
  const { id: chatId } = useParams();
  const [openPartialModal, closePartialModal] = usePartialScreenModal();
  const [currentUser, currentUserLoading] = useCurrentUser();
  const [chat] = useChat(chatId);
  let friendId: string | undefined;
  if (chat && currentUser) {
    friendId = chat.participants.filter(
      (participant) => participant.userId !== currentUser.id
    )[0].userId;
  }
  const [friend, friendLoading] = useUser(friendId);
  const friendName = removeTagFromName(friend?.username ?? '');
  const [input, setInput] = useState('');
  const { mutate: sendMessage } = useSendMessage();
  const [isMembersSlideOpen, setIsMembersSlideOpen] = useState(false);
  const [userChats, userChatsLoading] = useUserChats(currentUser?.userChatsId);
  const [isOwnChat, setIsOwnChat] = useState(false);
  const navigate = useNavigate();
  const loading = currentUserLoading || friendLoading || userChatsLoading;

  useEffect(() => {
    if (!userChats) return;

    const ownChat = userChats.chats.some((chat) => chat.chatId === chatId);
    if (!ownChat) {
      navigate('/channels/@me');
    } else {
      setIsOwnChat(true);
    }
  }, [userChats]);

  const handleSendMessage = () => {
    sendMessage({
      userId: currentUser!.id,
      chatId: chatId!,
      content: input,
    });
    setInput('');
  };

  const handleOpenUserPartialModal = () => {
    openPartialModal(
      !!friend && (
        <UserPartialModal userId={friend.id} close={closePartialModal} />
      )
    );
  };

  return (
    <div>
      <MembersSlider
        isOpen={isMembersSlideOpen}
        members={chat?.participants ?? []}
        onClose={() => setIsMembersSlideOpen(false)}
        headerProps={{
          title: removeTagFromName(friend?.username ?? ''),
          prefix: '@',
        }}
      />

      <div className={`relative ${isMembersSlideOpen ? '-left-80' : ''}`}>
        <ChatToolbar onMembersSlide={() => setIsMembersSlideOpen(true)}>
          <span onClick={handleOpenUserPartialModal}>{friendName}</span>
        </ChatToolbar>

        {isOwnChat && <ChatMessages user={friend} chatId={chatId} />}

        <ChatInput
          className={`${isMembersSlideOpen ? '!-left-80 !right-80' : ''}`}
          value={input}
          onChange={setInput}
          onEnter={handleSendMessage}
          placeholder={`Message @${friendName}`}
          disabled={loading || !isOwnChat}
        />
      </div>
    </div>
  );
};

export default Chat;
