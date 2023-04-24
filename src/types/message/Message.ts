import { Timestamp } from 'firebase/firestore';

interface IMessage {
  id: string;
  userId: string;
  content: string;
  inviteId?: string;
  timestamp: Timestamp | null;
}

export default IMessage;
