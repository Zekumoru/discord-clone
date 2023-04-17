import IRole from '../role/Role';

interface IGuild {
  id: string;
  name: string;
  pictureUrl: string | null;
  categoriesId: string;
  membersId: string;
  rolesId: string;
  systemMessagesChannelId: string;
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
