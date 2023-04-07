import '@test-utils/initialize';
import { getAuth } from 'firebase/auth';
import { setupBeforeAll } from '@test-utils';

beforeAll(setupBeforeAll);

describe('Firebase Testing', () => {
  it('should retrieve the supposed-to-be current user from the global setup', async () => {
    expect(getAuth().currentUser).toBeDefined();
    expect(getAuth().currentUser?.email).toBe('user@example.com');
  });
});
