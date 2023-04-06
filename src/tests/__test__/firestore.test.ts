import setup from '../firebase/setup';
import teardown from '../firebase/teardown';
import findUserByUsername from '../../types/user/firebase/findUserByUsername';

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('Testing firestore', () => {
  it('should test correctly', async () => {
    const user = await findUserByUsername('User#1234');

    expect(user?.username).toBe('User#1234');
  });
});
