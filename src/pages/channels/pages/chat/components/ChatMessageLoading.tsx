import { forwardRef } from 'react';
import useRandomWidth from '../../../../../components/useRandomWidth';
import ProfilePicture from '../../../components/ProfilePicture';
import MessageContentLoading from './MessageContentLoading';

const ChatMessageLoading = forwardRef<HTMLLIElement>((_props, ref) => {
  const nameWidth = useRandomWidth({ minPercent: 50, maxPercent: 90 }) / 2;

  return (
    <li ref={ref} className="message mx-4 mt-2.5 first-of-type:mt-0">
      <ProfilePicture user={undefined} />
      <div>
        <div className="flex h-6 items-center gap-2">
          <div
            style={{ width: `${nameWidth}%` }}
            className="skeleton-loading h-4 rounded-full"
          />
          <div className="skeleton-loading h-3 w-1/3 rounded-full" />
        </div>

        <MessageContentLoading />
      </div>
    </li>
  );
});

export default ChatMessageLoading;
