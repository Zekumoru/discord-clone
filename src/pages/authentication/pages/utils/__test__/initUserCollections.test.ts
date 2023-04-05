import { User } from 'firebase/auth';
import initUserCollections from '../initUserCollections';
import { nanoid } from 'nanoid';
import { getMockedFirestoreCollection } from '../../../../../../__mocks__/firebase/utils/mockFirestore';

vi.mock('firebase/firestore');

describe('authentication/initUserCollections', () => {
  it('should create the appropriate collections when a new user has been created in the cloud firestore', () => {
    initUserCollections(
      {
        uid: nanoid(),
        email: 'user@example.com',
      } as User,
      'User#1234'
    );

    expect(getMockedFirestoreCollection('users')).not.toEqual([]);
    expect(getMockedFirestoreCollection('user-guilds')).not.toEqual([]);
    expect(getMockedFirestoreCollection('friends')).not.toEqual([]);
    expect(getMockedFirestoreCollection('friend-requests')).not.toEqual([]);
  });
});
