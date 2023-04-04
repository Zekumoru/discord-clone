import IRole from '../role/Role';

interface IGuild {
  // Stub!
}

interface IUserGuild {
  id: string;
  role: IRole;
}

interface IUserGuilds {
  id: string;
  userId: string;
  guildsList: IUserGuild[];
}

export default IGuild;
export type { IUserGuild, IUserGuilds };
