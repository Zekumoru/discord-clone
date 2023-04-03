import { IconCheck, IconXMark } from '../../../../../../assets/icons';
import IFriend from '../../../../../../types/friend/Friend';
import CircledIconButton from '../CircledIconButton';
import FriendItem from './FriendItem';

type FriendRequestItemProps = {
  friend: IFriend;
};

const FriendRequestItem = ({ friend }: FriendRequestItemProps) => {
  return (
    <FriendItem
      friend={friend}
      buttons={
        <span className="flex gap-1.5">
          <CircledIconButton
            icon={
              <IconCheck strokeWidth={2} className="h-4 w-4 text-jade-100" />
            }
          />
          <CircledIconButton
            icon={
              <IconXMark strokeWidth={2} className="h-4 w-4 text-crimson-100" />
            }
          />
        </span>
      }
    />
  );
};

export default FriendRequestItem;
