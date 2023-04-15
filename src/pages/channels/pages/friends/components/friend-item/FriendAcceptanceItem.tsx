import { IconCheck, IconXMark } from '../../../../../../assets/icons';
import LoadingScreen from '../../../../../../components/LoadingScreen';
import { useCurrentUser } from '../../../../../../contexts/current-user/CurrentUserContext';
import { IFriendRequest } from '../../../../../../types/friend/Friend';
import useAcceptFriend from '../../hooks/useAcceptFriend';
import useRejectFriend from '../../hooks/useRejectFriend';
import CircledIconButton from '../CircledIconButton';
import FriendItem from './FriendItem';

type FriendAcceptanceItemProps = {
  request: IFriendRequest;
  onClick?: () => void;
};

const FriendAcceptanceItem = ({
  request,
  onClick,
}: FriendAcceptanceItemProps) => {
  const [user] = useCurrentUser();
  const { mutate: acceptFriend, isLoading: acceptLoading } = useAcceptFriend();
  const { mutate: rejectFriend, isLoading: rejectLoading } = useRejectFriend();

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
    <>
      {(acceptLoading || rejectLoading) && <LoadingScreen />}

      <FriendItem
        onClick={onClick}
        friendId={request.userId}
        buttons={
          <span className="flex gap-1.5">
            <CircledIconButton
              testid="accept-btn"
              onClick={handleAccept}
              icon={
                <IconCheck strokeWidth={2} className="h-4 w-4 text-jade-100" />
              }
            />
            <CircledIconButton
              testid="reject-btn"
              onClick={handleReject}
              icon={
                <IconXMark
                  strokeWidth={2}
                  className="h-4 w-4 text-crimson-100"
                />
              }
            />
          </span>
        }
      />
    </>
  );
};

export default FriendAcceptanceItem;
