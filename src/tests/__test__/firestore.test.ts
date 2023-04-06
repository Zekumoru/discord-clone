import setup from '../firebase/setup';
import teardown from '../firebase/teardown';
import findUserByFirebaseId from '../../types/user/firebase/findUserByFirebaseId';
import { getAuth } from 'firebase/auth';

afterEach(async () => {
  await teardown();
});

describe('Testing firestore', () => {
  it('should return the current user', async () => {
    const [user] = await setup();

    expect(user.username).toBe('User#1234');
  });

  it('should return users', async () => {
    const [user, testUser] = await setup(['User#1234', 'Test#7890']);

    expect(testUser.username).toBe('Test#7890');
  });

  it('should be able to get the current user', async () => {
    await setup();
    const user = await findUserByFirebaseId(getAuth().currentUser!.uid);

    expect(user?.username).toBe('User#1234');
  });

  test('that the first username is the current user when creating up multiple users', async () => {
    await setup(['User#1234', 'Foo#1597', 'Bar#2641']);
    const user = await findUserByFirebaseId(getAuth().currentUser!.uid);

    expect(user?.username).toBe('User#1234');
  });
});
