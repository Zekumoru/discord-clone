import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddFriendScreenModal from '../AddFriendScreenModal';
import { User } from 'firebase/auth';
import QueryClientInitializer from '../../../../../../../components/QueryClientInitializer';
import { QueryClient, QueryClientProvider } from 'react-query';
import IUser from '../../../../../../../types/user/User';
import { useAuthState } from 'react-firebase-hooks/auth';
import { QuerySnapshot, getDocs } from 'firebase/firestore';
import NoRetryQueryClientProvider from '../../../../../../../tests/NoRetryQueryClientProvider';
import CurrentUserProvider from '../../../../../../../contexts/current-user/CurrentUserContext';

vi.mock('firebase/auth');
vi.mock('firebase/firestore');
vi.mock('react-firebase-hooks/auth');

describe('AddFriendScreenModal', () => {
  it("should close the modal when the 'close' button is clicked", async () => {
    const user = userEvent.setup();
    const mockCurrenUser = () => {
      vi.mocked(useAuthState).mockReturnValue([
        {
          uid: '1234',
        } as User,
        false,
        undefined,
      ]);
      vi.mocked(getDocs<IUser>).mockResolvedValueOnce({
        docs: [
          {
            data: () => ({
              id: '1234',
              username: 'User#1234',
            }),
          },
        ],
      } as QuerySnapshot<IUser>);
    };
    const closeFn = vi.fn();
    mockCurrenUser();
    render(
      <NoRetryQueryClientProvider>
        <CurrentUserProvider>
          <AddFriendScreenModal close={closeFn} />
        </CurrentUserProvider>
      </NoRetryQueryClientProvider>
    );

    await user.click(screen.getByText('Close'));

    expect(closeFn).toBeCalled();
  });

  it("should show the name of the current user in the 'Your username is ...'", async () => {
    const mockCurrenUser = () => {
      vi.mocked(useAuthState).mockReturnValue([
        { uid: '1234' } as User,
        false,
        undefined,
      ]);
      vi.mocked(getDocs<IUser>).mockResolvedValueOnce({
        docs: [
          {
            data: () => ({
              id: '1234',
              username: 'User#1234',
            }),
          },
        ],
      } as QuerySnapshot<IUser>);
    };
    mockCurrenUser();
    render(
      <NoRetryQueryClientProvider>
        <CurrentUserProvider>
          <AddFriendScreenModal close={() => {}} />
        </CurrentUserProvider>
      </NoRetryQueryClientProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/your username is user#1234/i)
      ).toBeInTheDocument();
    });
  });

  it('should close the modal when friend request is sent', async () => {
    const user = userEvent.setup();
    const mockCurrenUser = () => {
      vi.mocked(useAuthState).mockReturnValue([
        { uid: '1234' } as User,
        false,
        undefined,
      ]);
      vi.mocked(getDocs<IUser>).mockResolvedValueOnce({
        docs: [
          {
            data: () => ({
              id: '1234',
              username: 'User#1234',
            }),
          },
        ],
      } as QuerySnapshot<IUser>);
    };
    mockCurrenUser();
    const closeFn = vi.fn();
    render(
      <NoRetryQueryClientProvider>
        <CurrentUserProvider>
          <AddFriendScreenModal close={closeFn} />
        </CurrentUserProvider>
      </NoRetryQueryClientProvider>
    );

    await user.click(screen.getByText('Close'));

    expect(closeFn).toBeCalled();
  });
});
