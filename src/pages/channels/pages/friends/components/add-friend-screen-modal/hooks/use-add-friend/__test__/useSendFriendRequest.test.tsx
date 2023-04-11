import '@test-utils/initialize';
import { sendFriendRequest } from '../useSendFriendRequest';
import { getDoc } from 'firebase/firestore';
import { IFriendRequest } from '../../../../../../../../../types/friend/Friend';
import friendRequestsDoc from '../../../../../../../../../types/friend/firebase/friendRequestsDoc';
import { setupBeforeAll, setupTest } from '@test-utils';
import { nanoid } from 'nanoid';

beforeAll(setupBeforeAll);

describe('AddFriendScreenModal/useSendFriendRequest', () => {
  it('should return an error if the user, for some reason, is not logged in then tries to add someone as a friend', async () => {
    await expect(sendFriendRequest(undefined, '')).rejects.toMatch(
      /user is not logged in/i
    );
  });

  it('should return an error if the user to add does not exist', async () => {
    const [cleanup, currentUser] = await setupTest({
      usernames: [`User#0000`],
    });

    await expect(
      sendFriendRequest(currentUser, 'Non Existent User#0000')
    ).rejects.toMatch(/user does not exist/i);
    await cleanup();
  });

  it('should return an error that you cannot add yourself as a friend', async () => {
    const [cleanup, currentUser] = await setupTest({
      usernames: [`User#0000`],
    });

    await expect(
      sendFriendRequest(currentUser, currentUser.username)
    ).rejects.toMatch(/cannot add yourself as a friend/i);
    await cleanup();
  });

  test('that the user sending the request gets a friend request of type pending request and the user being sent a friend request gets a friend request of type pending acceptance', async () => {
    const [cleanup, currentUser, otherUser] = await setupTest({
      usernames: [`User#0000`, 'Friend#7890'],
    });
    const currentUserRequestsRef = friendRequestsDoc(
      currentUser.friendRequestsId
    );
    const otherUserRequestsRef = friendRequestsDoc(otherUser.friendRequestsId);

    await sendFriendRequest(currentUser, otherUser.username);
    const currentUserRequests = (await getDoc(currentUserRequestsRef)).data()!;
    const otherUserRequests = (await getDoc(otherUserRequestsRef)).data()!;

    expect(currentUserRequests.requests[0]).toEqual<IFriendRequest>({
      userId: otherUser.id,
      pendingType: 'request',
    });
    expect(otherUserRequests.requests[0]).toEqual<IFriendRequest>({
      userId: currentUser.id,
      pendingType: 'acceptance',
    });
    await cleanup();
  });

  it('should return an error if a user tries to add the same user again', async () => {
    const [cleanup, currentUser, otherUser] = await setupTest({
      usernames: [`User#0000`, 'Friend#7890'],
    });

    await sendFriendRequest(currentUser, otherUser.username);

    await expect(
      sendFriendRequest(currentUser, otherUser.username)
    ).rejects.toMatch(/already sent/i);
    await cleanup();
  });
});
