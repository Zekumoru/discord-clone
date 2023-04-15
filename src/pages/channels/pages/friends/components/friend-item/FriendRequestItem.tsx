import { IconXMark } from '../../../../../../assets/icons';
import LoadingScreen from '../../../../../../components/LoadingScreen';
import { useCurrentUser } from '../../../../../../contexts/current-user/CurrentUserContext';
import { IFriendRequest } from '../../../../../../types/friend/Friend';
import useRemoveFriendRequest from '../../hooks/useRemoveFriendRequest';
import CircledIconButton from '../CircledIconButton';
import FriendItem from './FriendItem';

type FriendRequestItemProps = {
  request: IFriendRequest;
  onClick?: () => void;
};

const FriendRequestItem = ({ request, onClick }: FriendRequestItemProps) => {
  const [user] = useCurrentUser();
  const { mutate: removeFriendRequest, isLoading } = useRemoveFriendRequest();

  const handleRemoveFriendRequest = () => {
    removeFriendRequest({
      currentUser: user!,
      request,
    });
  };

  return (
    <>
      {isLoading && <LoadingScreen />}
      <FriendItem
        onClick={onClick}
        friendId={request.userId}
        buttons={
          <span className="flex gap-1.5">
            <CircledIconButton
              testid="reject-btn"
              onClick={handleRemoveFriendRequest}
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

export default FriendRequestItem;
