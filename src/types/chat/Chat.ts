interface IParticipant {
  userId: string;
}

interface IChat {
  id: string;
  messagesId: string;
  participants: IParticipant[];
}

export default IChat;
export type { IParticipant };
