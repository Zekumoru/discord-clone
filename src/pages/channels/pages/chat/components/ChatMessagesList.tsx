import { format } from 'date-fns';
import IMessage from '../../../../../types/message/Message';
import { Fragment, ReactNode } from 'react';
import ChatMessage from './ChatMessage';

type ChatMessagesListProps = {
  messages: IMessage[];
};

const ChatMessagesList = ({ messages }: ChatMessagesListProps) => {
  let currentDateString = '';

  return (
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
  );
};

export default ChatMessagesList;
