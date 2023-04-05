import UserPartialModal from '../../../../components/UserPartialModal';
import { useCurrentUser } from '../../../../contexts/current-user/CurrentUserContext';
import { usePartialScreenModal } from '../../../../contexts/partial-screen-modal/PartialScreenModalContext';
import FriendsToolbar from './components/FriendsToolbar';
import FriendRequestItem from './components/friend-item/FriendRequestItem';
import UserFriendItem from './components/friend-item/UserFriendItem';
import useFriendRequests from './hooks/useFriendRequests';
import useFriends from './hooks/useFriends';

const Friends = () => {
  const [user] = useCurrentUser();
  const [friends] = useFriends(user?.friendsId);
  const [friendRequests] = useFriendRequests(user?.friendRequestsId);
  const [openPartialModal, closePartialModal] = usePartialScreenModal();

  const pendingFriendAcceptances = friendRequests?.requests.filter(
    (request) => request.pendingType === 'acceptance'
  );

  const hasFriends = !!friends?.friendsList.length;
  const hasRequests = !!pendingFriendAcceptances?.length;

  return (
    <>
      <FriendsToolbar />

      {!hasFriends && !hasRequests ? (
        <div className="h-screen-toolbar flex flex-col items-center justify-center py-4">
          <img
            className="mb-2 h-40 w-40"
            src="https://sticker-collection.com/stickers/animated/HelloWumpus/whatsapp/f884a104-fdcd-4b9e-893e-707e5a7cca44file_3674657.webp"
            alt="Sad Wumpus"
          />
          <div className="font-medium text-silvergrey-300">
            Uh oh! You do not have any friends...
          </div>
        </div>
      ) : (
        <div className="py-4">
          {hasFriends && (
            <>
              <h2 className="heading-2 px-4">
                Added — {friends.friendsList.length}
              </h2>
              <ul>
                {friends.friendsList.map((friend) => (
                  <UserFriendItem
                    key={friend.userId}
                    friend={friend}
                    onClick={() =>
                      openPartialModal(
                        <UserPartialModal
                          userId={friend.userId}
                          close={closePartialModal}
                        />
                      )
                    }
                  />
                ))}
              </ul>
            </>
          )}

          {hasRequests && (
            <>
              <h2 className="heading-2 mt-4 px-4 first-of-type:mt-0">
                Requests — {pendingFriendAcceptances.length}
              </h2>
              <ul>
                {pendingFriendAcceptances.map((request, index) => (
                  <FriendRequestItem key={index} request={request} />
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Friends;
