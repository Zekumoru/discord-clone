import { ReactNode } from 'react';
import useUser from '../../../../../../types/user/hooks/useUser';

type FriendItemProps = {
  friendId: string | undefined;
  buttons?: ReactNode;
};

const FriendItem = ({ friendId, buttons }: FriendItemProps) => {
  const [friend] = useUser(friendId);

  return (
    <li className="li-rule-85 relative flex items-center gap-2 px-4 py-2">
      <span className="inline-block h-10 w-10 rounded-full bg-neutral-600" />
      <span className="mr-auto font-semibold">
        {friend?.username.slice(0, -5)}
      </span>
      {buttons}
    </li>
  );
};

export default FriendItem;
