import { useMutation } from 'react-query';
import userDoc from '../../user/firebase/userDoc';
import { getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import userChatsDoc from '../../user-chat/firebase/userChatsDoc';
import DiscordError from '../../../utils/DiscordError';
import chatMessageDoc from '../../chat/firebase/chatMessageDoc';
import snowflakeId from '../../../utils/snowflake-id/snowflakeId';

type SendInviteOptions = {
  inviterId: string;
  inviteeId: string;
  inviteId: string;
};

const sendInvite = async ({
  inviteId,
  inviterId,
  inviteeId,
}: SendInviteOptions) => {
  const inviter = (await getDoc(userDoc(inviterId))).data()!;
  const chatsRef = userChatsDoc(inviter.userChatsId);
  const { chats } = (await getDoc(chatsRef)).data()!;

  const chat = chats.find((chat) => chat.userId === inviteeId);
  if (!chat) {
    throw new DiscordError(
      'user-not-found',
      `Could not invite a user with id ${inviteeId} since it could not be found!`
    );
  }

  const messageId = snowflakeId();
  const messageRef = chatMessageDoc(chat.chatId, messageId);
  await setDoc(messageRef, {
    inviteId,
    id: messageId,
    userId: inviterId,
    content: '',
    timestamp: serverTimestamp(),
  });
};

type UseSendInviteOptions = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

const useSendInvite = ({ onSuccess, onError }: UseSendInviteOptions = {}) => {
  return useMutation(sendInvite, {
    onSuccess,
    onError,
  });
};

export default useSendInvite;
