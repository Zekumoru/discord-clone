import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  mockFirestoreCollection,
  mockResetFirestoreCollection,
  updateMockedOnSnapshot,
} from '../../../../../../__mocks__/firebase/utils/mockFirestore';
import NoRetryQueryClientProvider from '../../../../../tests/NoRetryQueryClientProvider';
import Chat from '../Chat';
import { Params, useParams } from 'react-router-dom';
import mockCurrentUser from '../../../../../contexts/current-user/utils/mockCurrentUser';
import CurrentUserProvider from '../../../../../contexts/current-user/CurrentUserContext';
import IUser from '../../../../../types/user/User';
import chatMessagesCollection from '../../../../../types/chat/firebase/chatMessagesCollection';
import { act } from 'react-dom/test-utils';

vi.mock('firebase/auth');
vi.mock('firebase/firestore');
vi.mock('react-firebase-hooks/auth');
vi.mock('react-router-dom');

const mockedUseParams = vi.mocked(useParams);
const setRouterParams = (obj: Params) => {
  mockedUseParams.mockReturnValue(obj);
};

afterEach(() => {
  mockedUseParams.mockRestore();
  mockResetFirestoreCollection();
});

describe('Chat', () => {
  it('should send a message and display it', async () => {
    const user = userEvent.setup();
    mockCurrentUser('user', 'user');
    setRouterParams({ id: 'chat-id' });
    render(
      <NoRetryQueryClientProvider>
        <CurrentUserProvider>
          <Chat />
        </CurrentUserProvider>
      </NoRetryQueryClientProvider>
    );
    const input = screen.getByPlaceholderText(/message/i);

    await user.click(input);
    await user.keyboard('Hello world!');
    await user.keyboard('{Enter}');
    act(() => {
      updateMockedOnSnapshot(chatMessagesCollection('chat-id'));
    });

    expect(screen.getByText(/hello world/i)).toBeInTheDocument();
  });

  it('should send multiple messages ', async () => {
    const user = userEvent.setup();
    mockCurrentUser('user', 'user');
    setRouterParams({ id: 'chat-id' });
    render(
      <NoRetryQueryClientProvider>
        <CurrentUserProvider>
          <Chat />
        </CurrentUserProvider>
      </NoRetryQueryClientProvider>
    );
    const input = screen.getByPlaceholderText(/message/i);

    await user.click(input);
    await user.keyboard('Hello world!');
    await user.keyboard('How are you?');
    await user.keyboard("I hope you're doing well.");
    await user.keyboard('{Enter}');
    act(() => {
      updateMockedOnSnapshot(chatMessagesCollection('chat-id'));
    });

    expect(screen.getByText(/hello world/i)).toBeInTheDocument();
    expect(screen.getByText(/how are you/i)).toBeInTheDocument();
    expect(screen.getByText(/i hope you're doing well/i)).toBeInTheDocument();
  });
});
