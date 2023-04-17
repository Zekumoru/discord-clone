import { useNavigate, useParams } from 'react-router-dom';
import Chat from './Chat';
import ChatToolbar from './components/ChatToolbar';
import { usePartialScreenModal } from '../../../../contexts/partial-screen-modal/PartialScreenModalContext';
import { useMembersSlider } from '../../../../contexts/members-slider/MembersSliderContext';
import useChat from '../../../../types/chat/hooks/useChat';
import useFriend from './hooks/useFriend';
import extractNameAndTag from '../../../../utils/extractNameAndTag';
import { useCurrentUser } from '../../../../contexts/current-user/CurrentUserContext';
import UserPartialModal from '../../../../components/user-partial-modal/UserPartialModal';
import ChatMessages from './components/ChatMessages';
import { useEffect } from 'react';
import useOwnsChat from './hooks/useOwnsChat';

const FriendChat = () => {
  const { id: chatId } = useParams();
  const [currentUser] = useCurrentUser();
  const [chat] = useChat(chatId);
  const [openPartialModal, closePartialModal] = usePartialScreenModal();
  const [openMembersSlider] = useMembersSlider();
  const [friend] = useFriend(currentUser, chatId);
  const [friendName] = extractNameAndTag(friend?.username ?? '');
  const [ownsChat] = useOwnsChat(chatId);
  const navigate = useNavigate();

  useEffect(() => {
    if (ownsChat === undefined) return;
    if (ownsChat) return;

    navigate('/channels/@me');
  }, [ownsChat]);

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
    <Chat
      chatId={chatId}
      disabled={!ownsChat || ownsChat === undefined}
      placeholder={`Message @${friendName}`}
    >
      <ChatToolbar onOpenMembersSlider={handleOpenMembersSlider} prefix="@">
        <span onClick={handleOpenUserPartialModal}>{friendName}</span>
      </ChatToolbar>

      {ownsChat && <ChatMessages user={friend} chatId={chatId} />}
    </Chat>
  );
};

export default FriendChat;
