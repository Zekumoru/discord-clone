import { format } from 'date-fns';
import IUser from '../../../../../types/user/User';
import extractNameAndTag from '../../../../../utils/extractNameAndTag';
import ProfilePicture from '../../../components/ProfilePicture';
import useMessages from '../hooks/useMessages';
import ChatMessage from './ChatMessage';
import { Fragment, ReactNode } from 'react';

type ChatMessagesProps = {
  user: IUser | undefined;
  chatId: string | undefined;
};

const ChatMessages = ({ user, chatId }: ChatMessagesProps) => {
  const [messages] = useMessages(chatId);
  const [name] = extractNameAndTag(user?.username ?? '');
  let currentDateString = '';

  return (
    <div className="h-screen-toolbar flex flex-col justify-end p-4">
      <div>
        <ProfilePicture user={user} className="mb-2 h-20 w-20" />

        <h2 className="text-2xl font-bold">{name}</h2>

        <p className="text-silvergrey-300">
          This is the beginning of your direct message history with{' '}
          <span className="font-semibold">{name}</span>.
        </p>
      </div>

      <ul className="mb-14">
        {messages.map((message) => {
          const dateString = message.timestamp
            ? format(message.timestamp?.toDate(), 'PP')
            : '';
          let dateHeader: ReactNode = null;

          if (dateString !== currentDateString) {
            currentDateString = dateString;
            dateHeader = (
              <li className="my-2.5 flex items-center gap-2">
                <div className="flex-1 border-b border-silvergrey-800" />
                <div className="text-xs font-semibold text-silvergrey-400">
                  {currentDateString}
                </div>
                <div className="flex-1 border-b border-silvergrey-800" />
              </li>
            );
          }

          return (
            <Fragment key={message.id}>
              {dateHeader}
              <ChatMessage message={message} />
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default ChatMessages;
