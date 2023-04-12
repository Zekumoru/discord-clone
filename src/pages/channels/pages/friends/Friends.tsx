import { useCurrentUser } from '../../../../contexts/current-user/CurrentUserContext';
import FriendRequestsList from './components/FriendRequestsList';
import FriendsList from './components/FriendsList';
import FriendsToolbar from './components/FriendsToolbar';
import NoFriendsDisplay from './components/NoFriendsDisplay';
import useFriendRequests from './hooks/useFriendRequests';
import useFriends from './hooks/useFriends';

const Friends = () => {
  const [user] = useCurrentUser();
  const [friends] = useFriends(user?.friendsId);
  const [friendRequests] = useFriendRequests(user?.friendRequestsId);

  const hasFriends = !!friends?.friendsList.length;
  const hasRequests = !!friendRequests?.requests.length;

  return (
    <>
      <FriendsToolbar />

      {!hasFriends && !hasRequests ? (
        <NoFriendsDisplay />
      ) : (
        <div className="py-4">
          {hasFriends && <FriendsList friends={friends.friendsList} />}

          {hasRequests && (
            <FriendRequestsList requests={friendRequests.requests} />
          )}
        </div>
      )}
    </>
  );
};

export default Friends;
