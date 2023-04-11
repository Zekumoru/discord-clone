import '@test-utils/initialize';
import { getDoc } from 'firebase/firestore';
import friendRequestsDoc from '../../../../../types/friend/firebase/friendRequestsDoc';
import friendsDoc from '../../../../../types/friend/firebase/friendsDoc';
import { sendFriendRequest } from '../components/add-friend-screen-modal/hooks/use-add-friend/useSendFriendRequest';
import { rejectFriend } from '../hooks/useRejectFriend';
import { setupBeforeAll, setupTest } from '@test-utils';
import { nanoid } from 'nanoid';

beforeAll(setupBeforeAll);

describe('FriendsPage/useRejectFriend', () => {
  it('should remove the friend requests if rejected', async () => {
    const [cleanup, currentUser, otherUser] = await setupTest({
      usernames: [`User#0000`, 'Test#7890'],
    });
    const currentUserFriendRequestsRef = friendRequestsDoc(
      currentUser.friendRequestsId
    );
    const otherUserFriendRequestsRef = friendRequestsDoc(
      otherUser.friendRequestsId
    );
    const currentUserFriendsRef = friendsDoc(currentUser.friendsId);
    const otherUserFriendsRef = friendsDoc(otherUser.friendsId);

    await sendFriendRequest(otherUser, currentUser.username);
    await rejectFriend({
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
    expect(currentUserFriends.friendsList).toEqual([]);
    expect(otherUserFriends.friendsList).toEqual([]);
    await cleanup();
  });
});
