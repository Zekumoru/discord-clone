import { IconCheck, IconXMark } from '../../../../../../assets/icons';
import { useCurrentUser } from '../../../../../../contexts/current-user/CurrentUserContext';
import { IFriendRequest } from '../../../../../../types/friend/Friend';
import useAcceptFriend from '../../hooks/useAcceptFriend';
import useRejectFriend from '../../hooks/useRejectFriend';
import CircledIconButton from '../CircledIconButton';
import FriendItem from './FriendItem';

type FriendRequestItemProps = {
  request: IFriendRequest;
};

const FriendRequestItem = ({ request }: FriendRequestItemProps) => {
  const [user] = useCurrentUser();
  const { mutate: acceptFriend } = useAcceptFriend();
  const { mutate: rejectFriend } = useRejectFriend();

  const handleAccept = () => {
    acceptFriend({
      currentUser: user!,
      request,
    });
  };

  const handleReject = () => {
    rejectFriend({
      currentUser: user!,
      request,
    });
  };

  return (
    <FriendItem
      friendId={request.userId}
      buttons={
        <span className="flex gap-1.5">
          <CircledIconButton
            onClick={handleAccept}
            icon={
              <IconCheck strokeWidth={2} className="h-4 w-4 text-jade-100" />
            }
          />
          <CircledIconButton
            onClick={handleReject}
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
