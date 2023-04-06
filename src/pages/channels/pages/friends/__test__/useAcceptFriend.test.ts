import setup from '../../../../../tests/firebase/setup';
import { getDoc } from 'firebase/firestore';
import teardown from '../../../../../tests/firebase/teardown';
import friendsDoc from '../../../../../types/friend/firebase/friendsDoc';
import friendRequestsDoc from '../../../../../types/friend/firebase/friendRequestsDoc';
import { acceptFriend } from '../hooks/useAcceptFriend';
import { sendFriendRequest } from '../components/add-friend-screen-modal/hooks/use-add-friend/useSendFriendRequest';

afterEach(async () => {
  await teardown();
});

describe('FriendsPage/useAcceptFriend', () => {
  it('should add the user as a friend on friend request accepted', async () => {
    const [currentUser, otherUser] = await setup(['User#1234', 'Test#7890']);
    const currentUserFriendRequestsRef = friendRequestsDoc(
      currentUser.friendRequestsId
    );
    const otherUserFriendRequestsRef = friendRequestsDoc(
      otherUser.friendRequestsId
    );
    const currentUserFriendsRef = friendsDoc(currentUser.friendsId);
    const otherUserFriendsRef = friendsDoc(otherUser.friendsId);

    await sendFriendRequest(otherUser, currentUser.username);
    await acceptFriend({
      currentUser,
      request: {
        userId: otherUser.id,
        pendingType: 'acceptance',
      },
    });
    const currentUserFriendsRequests = (
      await getDoc(currentUserFriendRequestsRef)
    ).data()!;
    const otherUserFriendsRequests = (
      await getDoc(otherUserFriendRequestsRef)
    ).data()!;
    const currentUserFriends = (await getDoc(currentUserFriendsRef)).data()!;
    const otherUserFriends = (await getDoc(otherUserFriendsRef)).data()!;

    expect(currentUserFriendsRequests.requests).toEqual([]);
    expect(otherUserFriendsRequests.requests).toEqual([]);
    expect(currentUserFriends.friendsList[0].userId).toBe(otherUser.id);
    expect(otherUserFriends.friendsList[0].userId).toBe(currentUser.id);
  });
});
