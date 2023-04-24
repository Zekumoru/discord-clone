interface IRole {
  id: string;
  name: string;
}

interface IRoles {
  id: string;
  guildId: string;
  roles: IRole[];
}

export default IRole;
export type { IRoles };
