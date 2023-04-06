import useUserPartialModal from '../../../../../components/user-partial-modal/hooks/useUserPartialModal';
import IFriend from '../../../../../types/friend/Friend';
import UserFriendItem from './friend-item/UserFriendItem';

type FriendsListProps = {
  friends: IFriend[];
};

const FriendsList = ({ friends }: FriendsListProps) => {
  const [openUserPartialModal] = useUserPartialModal();

  return (
    <>
      <h2 className="heading-2 px-4">Added — {friends.length}</h2>
      <ul>
        {friends.map((friend) => (
          <UserFriendItem
            key={friend.userId}
            friend={friend}
            onClick={() => openUserPartialModal(friend.userId)}
          />
        ))}
      </ul>
    </>
  );
};

export default FriendsList;
