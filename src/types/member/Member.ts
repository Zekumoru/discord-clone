interface IMember {
  userId: string;
  roleId: string;
}

interface IMembers {
  id: string;
  guildId: string;
  members: IMember[];
}

export default IMember;
export type { IMembers };
