import '@test-utils/initialize';
import { getDoc } from 'firebase/firestore';
import userDoc from '../../types/user/firebase/userDoc';
import { setupBeforeAll, setupTest } from '@test-utils';

beforeAll(setupBeforeAll);

describe('Firebase Testing', () => {
  it('should return users and they should exists in db', async () => {
    const [cleanup, a, b, c] = await setupTest(['a#0000', 'b#0000', 'c#0000']);

    expect((await getDoc(userDoc(a.id))).data()).toBeDefined();
    expect((await getDoc(userDoc(b.id))).data()).toBeDefined();
    expect((await getDoc(userDoc(c.id))).data()).toBeDefined();
    await cleanup();
  });
});
