import { format, isToday, isYesterday } from 'date-fns';
import IMessage from '../../../../../types/message/Message';
import useUser from '../../../../../types/user/hooks/useUser';
import removeTagFromName from '../../../../../utils/removeTagFromName';
import ProfilePicture from '../../../components/ProfilePicture';
import useUserPartialModal from '../../../../../components/user-partial-modal/hooks/useUserPartialModal';
import ChatInvite from './ChatInvite';
import { Fragment, forwardRef, useMemo, useState } from 'react';
import mentionStyles from '../styles/mentions.module.css';
import { useUsers } from '../contexts/UsersContext';
import IUser from '../../../../../types/user/User';
import extractNameAndTag from '../../../../../utils/extractNameAndTag';
import { useCurrentUser } from '../../../../../contexts/current-user/CurrentUserContext';

const MENTION_PATTERN = /<@\d*>/g;

type ChatMessageProps = {
  message: IMessage;
};

const ChatMessage = forwardRef<HTMLLIElement, ChatMessageProps>(
  ({ message }, ref) => {
    const [currentUser] = useCurrentUser();
    const [user] = useUser(message.userId);
    const [openUserPartialModal] = useUserPartialModal();
    const [isMentioned, setIsMentioned] = useState(false);
    const users = useUsers();
    const usersMap = useMemo(() => {
      const usersMap = new Map<string, IUser>();
      if (users === undefined) return usersMap;

      users.forEach((user) => usersMap.set(user.id, user));
      return usersMap;
    }, [users]);

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

    const messageBlocks = useMemo(() => {
      const messageBlocks: string[] = [];

      let endCursor = 0;
      for (const mentionBlock of message.content.matchAll(MENTION_PATTERN)) {
        messageBlocks.push(
          message.content.slice(endCursor, mentionBlock.index!)
        );
        messageBlocks.push(mentionBlock[0]);
        endCursor = mentionBlock[0].length + mentionBlock.index!;

        if (currentUser && mentionBlock[0].includes(currentUser.id)) {
          setIsMentioned(true);
        }
      }
      messageBlocks.push(message.content.slice(endCursor));

      return messageBlocks;
    }, [message]);

    const handleOpenUserPartialModal = () => {
      openUserPartialModal(user?.id);
    };

    return (
      <li
        ref={ref}
        className={`${
          isMentioned ? 'border-l-[3px] border-gold-100 bg-gold-700' : ''
        } message mt-1.5 px-4 py-1 first-of-type:mt-0`}
      >
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
                <div className="whitespace-break-spaces text-silvergrey-100">
                  {messageBlocks.map((block, index) => {
                    const mention = block.match(MENTION_PATTERN);
                    if (mention) {
                      const id = mention[0].substring(2, mention[0].length - 1);
                      const user = usersMap.get(id);

                      if (user) {
                        const [name] = extractNameAndTag(user.username ?? '');

                        return (
                          <span key={index} className={mentionStyles.mention}>
                            @{name}
                          </span>
                        );
                      }
                    }

                    return <Fragment key={index}>{block}</Fragment>;
                  })}
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
