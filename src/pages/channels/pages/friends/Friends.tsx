import { useCurrentUser } from '../../../../contexts/current-user/CurrentUserContext';
import FriendsToolbar from './components/FriendsToolbar';
import FriendRequestItem from './components/friend-item/FriendRequestItem';
import UserFriendItem from './components/friend-item/UserFriendItem';
import useFriendRequests from './hooks/useFriendRequests';
import useFriends from './hooks/useFriends';

const Friends = () => {
  const [user] = useCurrentUser();
  const [friends] = useFriends(user?.friendsId);
  const [friendRequests] = useFriendRequests(user?.friendRequestsId);

  const pendingFriendAcceptances =
    friendRequests?.requests.filter(
      (request) => request.pendingType === 'acceptance'
    ) ?? [];

  return (
    <>
      <FriendsToolbar />

      <div className="py-4">
        <h2 className="heading-2 px-4">
          Added — {friends ? friends.friendsList.length : 0}
        </h2>
        <ul>
          {friends?.friendsList.map((friend) => (
            <UserFriendItem key={friend.userId} friend={friend} />
          ))}
        </ul>

        <h2 className="heading-2 mt-4 px-4">
          Requests — {pendingFriendAcceptances.length}
        </h2>
        <ul>
          {pendingFriendAcceptances.map((request, index) => (
            <FriendRequestItem key={index} request={request} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default Friends;
