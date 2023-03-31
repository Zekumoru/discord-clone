import { ReactNode } from 'react';
import IFriend from '../../../../../types/Friend';

type FriendItemProps = {
  friend: IFriend;
  buttons?: ReactNode;
};

const FriendItem = ({ friend, buttons }: FriendItemProps) => {
  return (
    <li className="li-rule-85 relative flex items-center gap-2 px-4 py-2">
      <span className="inline-block h-10 w-10 rounded-full bg-neutral-600" />
      <span className="mr-auto font-semibold">{friend.userId}</span>
      {buttons}
    </li>
  );
};

export default FriendItem;
