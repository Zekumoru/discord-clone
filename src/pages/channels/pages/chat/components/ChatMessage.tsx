import { format, isToday, isYesterday } from 'date-fns';
import IMessage from '../../../../../types/message/Message';
import useUser from '../../../../../types/user/hooks/useUser';
import removeTagFromName from '../../../../../utils/removeTagFromName';
import ProfilePicture from '../../../components/ProfilePicture';
import useUserPartialModal from '../../../../../components/user-partial-modal/hooks/useUserPartialModal';
import ChatInvite from './ChatInvite';
import { forwardRef, useMemo } from 'react';

type ChatMessageProps = {
  message: IMessage;
};

const ChatMessage = forwardRef<HTMLLIElement, ChatMessageProps>(
  ({ message }, ref) => {
    const [user] = useUser(message.userId);
    const [openUserPartialModal] = useUserPartialModal();

    const userName = removeTagFromName(user?.username ?? '');
    const datetime = useMemo(() => {
      if (!message.timestamp) {
        return '';
      }

      const timestamp = message.timestamp.toDate();
      if (isToday(timestamp)) {
        return `Today at ${format(timestamp, 'h:mm a')}`;
      }

      if (isYesterday(timestamp)) {
        return `Yesterday at ${format(timestamp, 'h:mm a')}`;
      }

      return format(timestamp, 'MM/dd/yyyy h:mm a');
    }, [message]);

    const handleOpenUserPartialModal = () => {
      openUserPartialModal(user?.id);
    };

    return (
      <li ref={ref} className="message mt-2.5 first-of-type:mt-0">
        {datetime !== '' && (
          <>
            <ProfilePicture user={user} onClick={handleOpenUserPartialModal} />
            <div className="hidden-x-auto min-w-0">
              <div className="flex h-6 min-w-0 items-center font-medium">
                <div className="truncate" onClick={handleOpenUserPartialModal}>
                  {userName}
                </div>
                <div className="ml-1.5 flex-shrink-0 text-xs text-silvergrey-400">
                  {datetime}
                </div>
              </div>

              {message.inviteId !== undefined ? (
                <ChatInvite message={message} />
              ) : (
                <div className="break-words text-silvergrey-100">
                  {message.content}
                </div>
              )}
            </div>
          </>
        )}
      </li>
    );
  }
);

export default ChatMessage;
