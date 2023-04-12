import { useCurrentUser } from '../../../contexts/current-user/CurrentUserContext';
import useSendFriendRequest from '../../../pages/channels/pages/friends/components/add-friend-screen-modal/hooks/use-add-friend/useSendFriendRequest';
import useAcceptFriend from '../../../pages/channels/pages/friends/hooks/useAcceptFriend';
import useRemoveFriendRequest from '../../../pages/channels/pages/friends/hooks/useRemoveFriendRequest';
import useFriendRequest from '../../../types/friend/hooks/useFriendRequest';
import useIsFriend from '../../../types/friend/hooks/useIsFriend';
import IUser from '../../../types/user/User';
import useRemoveFriend from '../hooks/useRemoveFriend';

type FriendActionProps = {
  friend: IUser;
  onActionSuccess?: () => void;
};

const FriendAction = ({ friend, onActionSuccess }: FriendActionProps) => {
  const [currentUser] = useCurrentUser();
  const [isFriend] = useIsFriend(friend.id);
  const [friendRequest] = useFriendRequest(currentUser, friend.id);
  const { mutate: sendFriendRequest } = useSendFriendRequest({
    onSuccess: onActionSuccess,
  });
  const { mutate: acceptFriendRequest } = useAcceptFriend({
    onSuccess: onActionSuccess,
  });
  const { mutate: removeFriendRequest } = useRemoveFriendRequest({
    onSuccess: onActionSuccess,
  });
  const { mutate: removeFriend } = useRemoveFriend({
    onSuccess: onActionSuccess,
  });

  const handleSendFriendRequest = () => {
    sendFriendRequest(friend.username);
  };

  const handleAcceptFriendRequest = () => {
    acceptFriendRequest({
      currentUser: currentUser!,
      request: friendRequest!,
    });
  };

  const handleRemoveFriendRequest = () => {
    removeFriendRequest({
      currentUser: currentUser!,
      request: friendRequest!,
    });
  };

  const handleRemoveFriend = () => {
    removeFriend({
      currentUser: currentUser!,
      friendToRemove: friend,
    });
  };

  if (isFriend) {
    return (
      <li onClick={handleRemoveFriend} className="p-4 text-salmon-100">
        Remove Friend
      </li>
    );
  }

  if (friendRequest !== undefined) {
    return friendRequest.pendingType === 'request' ? (
      <li onClick={handleRemoveFriendRequest} className="p-4 text-salmon-100">
        Remove Friend Request
      </li>
    ) : (
      <li onClick={handleAcceptFriendRequest} className="p-4">
        Accept Friend Request
      </li>
    );
  }

  return (
    <li onClick={handleSendFriendRequest} className="p-4">
      Add Friend
    </li>
  );
};

export default FriendAction;
