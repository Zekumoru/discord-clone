import { ReactNode } from 'react';
import useUser from '../../../../../../types/user/hooks/useUser';
import removeTagFromName from '../../../../../../utils/removeTagFromName';
import ProfilePicture from '../../../../components/ProfilePicture';

type FriendItemProps = {
  friendId: string | undefined;
  buttons?: ReactNode;
  onClick?: () => void;
};

const FriendItem = ({ friendId, buttons, onClick }: FriendItemProps) => {
  const [friend] = useUser(friendId);

  return (
    <li className="li-rule-85 relative flex items-center gap-2 px-4 py-2">
      <ProfilePicture user={friend} />
      <span onClick={onClick} className="mr-auto flex-1 truncate font-semibold">
        {removeTagFromName(friend?.username ?? '')}
      </span>
      {buttons}
    </li>
  );
};

export default FriendItem;
