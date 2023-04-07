import '@test-utils/initialize';
import usersCollection from '../../../../../types/user/firebase/usersCollection';
import { getDocs } from 'firebase/firestore';
import userGuildsCollection from '../../../../../types/user/firebase/userGuildsCollection';
import friendsCollection from '../../../../../types/friend/firebase/friendsCollection';
import friendRequestsCollection from '../../../../../types/friend/firebase/friendRequestsCollection';
import { setupBeforeAll, setupTest } from '@test-utils';

beforeAll(setupBeforeAll);

describe('authentication/initUserCollections', () => {
  it('should create the appropriate collections when a new user has been created in the cloud firestore', async () => {
    const [cleanup] = await setupTest();

    expect((await getDocs(usersCollection)).docs).not.toEqual([]);
    expect((await getDocs(userGuildsCollection)).docs).not.toEqual([]);
    expect((await getDocs(friendsCollection)).docs).not.toEqual([]);
    expect((await getDocs(friendRequestsCollection)).docs).not.toEqual([]);
    await cleanup();
  });
});
