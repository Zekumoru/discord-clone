import { render, screen, waitFor } from '@testing-library/react';
import MembersSlider from '../components/members-slider/MembersSlider';
import {
  mockFirestoreCollection,
  mockResetFirestoreCollection,
} from '../../../../../../__mocks__/firebase/utils/mockFirestore';
import NoRetryQueryClientProvider from '../../../../../tests/NoRetryQueryClientProvider';
import IUser from '../../../../../types/user/User';

vi.mock('firebase/firestore');

afterEach(() => {
  mockResetFirestoreCollection();
});

describe('MembersSlider', () => {
  it("should show the title with the friend's name if on the friend's chat", () => {
    const Component = () => {
      return (
        <MembersSlider
          isOpen={true}
          headerProps={{ title: 'Friend', prefix: '@' }}
          members={[]}
        />
      );
    };
    render(<Component />);

    expect(screen.getByText('@')).toBeInTheDocument();
    expect(screen.getByText('Friend')).toBeInTheDocument();
  });

  it('should display the members', async () => {
    mockFirestoreCollection<IUser>('users', {
      '1234': {
        id: '1234',
        username: 'User#1234',
        pictureUrl: null,
      } as IUser,
      '7890': {
        id: '7890',
        username: 'Friend#7890',
        pictureUrl: null,
      } as IUser,
    });
    const Component = () => {
      return (
        <MembersSlider
          isOpen={true}
          headerProps={{ title: 'TEST', prefix: '@' }}
          members={[{ userId: '1234' }, { userId: '7890' }]}
        />
      );
    };
    render(
      <NoRetryQueryClientProvider>
        <Component />
      </NoRetryQueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/members — 2/i)).toBeInTheDocument();
      expect(screen.getByText('User')).toBeInTheDocument();
      expect(screen.getByText('Friend')).toBeInTheDocument();
    });
  });
});
