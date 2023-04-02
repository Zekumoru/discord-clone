import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ScreenModalProvider, {
  useScreenModal,
} from '../../../../../contexts/screen-modal/ScreenModalContext';
import AddFriendScreenModal from '../AddFriendScreenModal';
import { useAuthState } from 'react-firebase-hooks/auth';
import { User } from 'firebase/auth';
import findUserByUsername from '../../../../../types/user/firebase/findUserByUsername';
import QueryClientInitializer from '../../../../../components/QueryClientInitializer';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useCurrentUser } from '../../../../../contexts/current-user/CurrentUserContext';
import IUser from '../../../../../types/user/User';

vi.mock('../../../../../contexts/current-user/CurrentUserContext', () => ({
  useCurrentUser: vi.fn(() => []),
}));
const mockedUseCurrentUser = vi.mocked(useCurrentUser);

vi.mock('../../../../../types/user/firebase/findUserByUsername', () => ({
  default: vi.fn(async () => {}),
}));
const mockedFindUserByUsername = vi.mocked(findUserByUsername);

vi.mock('firebase/auth');
vi.mock('firebase/firestore', () => ({
  getFirestore: () => {},
  collection: () => ({
    withConverter: () => {},
  }),
}));

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(() => []),
}));
const mockedUseAuthState = vi.mocked(useAuthState);

afterEach(() => {
  mockedFindUserByUsername.mockRestore();
  mockedUseAuthState.mockRestore();
});

describe('AddFriendScreenModal', () => {
  it("should close the modal when the 'close' button is clicked", async () => {
    const user = userEvent.setup();
    const closeFn = vi.fn();
    render(
      <QueryClientInitializer>
        <AddFriendScreenModal close={closeFn} />
      </QueryClientInitializer>
    );

    await user.click(screen.getByText('Close'));

    expect(closeFn).toBeCalled();
  });

  it("should show the name of the current user in the 'Your username is ...'", () => {
    mockedUseAuthState.mockReturnValue([
      { displayName: 'User#1234' } as User,
      false,
      undefined,
    ]);
    render(
      <QueryClientInitializer>
        <AddFriendScreenModal close={() => {}} />
      </QueryClientInitializer>
    );

    expect(screen.getByText(/your username is user#1234/i)).toBeInTheDocument();
  });

  it('should close the modal when friend request is sent', async () => {
    const user = userEvent.setup();
    const closeFn = vi.fn();
    mockedUseCurrentUser.mockReturnValue([{} as IUser, false, undefined]);
    mockedFindUserByUsername.mockReturnValue(Promise.resolve({} as IUser));
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    render(
      <QueryClientProvider client={queryClient}>
        <AddFriendScreenModal close={closeFn} />
      </QueryClientProvider>
    );

    await user.click(screen.getByText('Close'));

    expect(closeFn).toBeCalled();
  });
});
