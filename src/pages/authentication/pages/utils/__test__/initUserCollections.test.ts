import setup from '../../../../../tests/firebase/setup';
import teardown from '../../../../../tests/firebase/teardown';
import usersCollection from '../../../../../types/user/firebase/usersCollection';
import { getDocs } from 'firebase/firestore';
import userGuildsCollection from '../../../../../types/user/firebase/userGuildsCollection';
import friendsCollection from '../../../../../types/friend/firebase/friendsCollection';
import friendRequestsCollection from '../../../../../types/friend/firebase/friendRequestsCollection';

afterEach(async () => {
  await teardown();
});

describe('authentication/initUserCollections', () => {
  it('should create the appropriate collections when a new user has been created in the cloud firestore', async () => {
    await setup();

    expect((await getDocs(usersCollection)).docs).not.toEqual([]);
    expect((await getDocs(userGuildsCollection)).docs).not.toEqual([]);
    expect((await getDocs(friendsCollection)).docs).not.toEqual([]);
    expect((await getDocs(friendRequestsCollection)).docs).not.toEqual([]);
  });
});
