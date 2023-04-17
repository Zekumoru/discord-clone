interface IMember {
  userId: string;
  roleId: string | null;
}

interface IMembers {
  id: string;
  guildId: string;
  members: IMember[];
}

export default IMember;
export type { IMembers };
