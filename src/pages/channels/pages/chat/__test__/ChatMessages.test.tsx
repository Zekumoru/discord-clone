import { render, screen } from '@testing-library/react';
import ChatMessages from '../components/ChatMessages';
import NoRetryQueryClientProvider from '../../../../../tests/NoRetryQueryClientProvider';
import {
  mockFirestoreCollection,
  mockResetFirestoreCollection,
} from '../../../../../../__mocks__/firebase/utils/mockFirestore';
import IMessage from '../../../../../types/message/Message';
import { Timestamp } from 'firebase/firestore';

vi.mock('firebase/auth');
vi.mock('firebase/firestore');
vi.mock('react-firebase-hooks/auth');

afterEach(() => {
  mockResetFirestoreCollection();
});

describe('Chat/ChatMessages', () => {
  it('should render messages', () => {
    mockFirestoreCollection<IMessage>('chats/chat-id/messages', {
      msg1: {
        id: 'msg1',
        content: 'Hello world!',
        userId: '1234',
        timestamp: {
          toDate: () => new Date(2023, 3, 5, 13, 0, 0),
        } as Timestamp,
      },
      msg2: {
        id: 'msg2',
        content: 'Hey! How are you doing?',
        userId: '7890',
        timestamp: {
          toDate: () => new Date(2023, 3, 5, 13, 0, 5),
        } as Timestamp,
      },
    });
    render(
      <NoRetryQueryClientProvider>
        <ChatMessages chatId="chat-id" />
      </NoRetryQueryClientProvider>
    );

    const datetimes = screen.getAllByText('04/05/2023 1:00 PM');

    expect(screen.getByText(/hello world/i)).toBeInTheDocument();
    expect(screen.getByText(/how are you doing/i)).toBeInTheDocument();
    for (const datetime of datetimes) {
      expect(datetime).toBeInTheDocument();
    }
  });
});
