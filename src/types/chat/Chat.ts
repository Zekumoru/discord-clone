import IMember from '../member/Member';

interface IChat {
  id: string;
  messagesId: string;
  participants: IMember[];
}

export default IChat;
