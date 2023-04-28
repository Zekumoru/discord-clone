import { toast } from 'react-toastify';
import { useCurrentUser } from '../../../../../contexts/current-user/CurrentUserContext';
import { ChatProps } from '../Chat';
import useSendMessage from './useSendMessage';

const useHandleSendMessage = (props: ChatProps) => {
  const [currentUser] = useCurrentUser();
  const { mutate: sendMessage } = useSendMessage();

  const handleSendMessage = (message: string) => {
    if (!currentUser) {
      toast.error('User is not logged in!');
      return;
    }

    const type = props.type;
    if (type === 'chat') {
      const chatId = props.chatId;
      if (!chatId) {
        toast.error('Could not send message!');
        return;
      }

      sendMessage({
        chatId,
        type,
        userId: currentUser.id,
        content: message,
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
        content: message,
      });
    }
  };

  return handleSendMessage;
};

export default useHandleSendMessage;
