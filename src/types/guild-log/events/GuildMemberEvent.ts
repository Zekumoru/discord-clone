interface IGuildMemberEvent {
  type: 'user-joined' | 'user-left' | 'user-kicked';
  userId: string;
}

export default IGuildMemberEvent;
