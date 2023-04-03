import { useCurrentUser } from '../../../../contexts/current-user/CurrentUserContext';
import FriendsToolbar from './components/FriendsToolbar';
import UserFriendItem from './components/friend-item/UserFriendItem';
import useFriends from './hooks/useFriends';

const Friends = () => {
  const [user] = useCurrentUser();
  const [friends] = useFriends(user?.friendsId);

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

        <h2 className="heading-2 mt-4 px-4">Requests — 1</h2>
        <ul></ul>
      </div>
    </>
  );
};

export default Friends;
