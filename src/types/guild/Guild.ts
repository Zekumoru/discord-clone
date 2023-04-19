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
  guildId: string;
}

interface IUserGuilds {
  id: string;
  userId: string;
  guildsList: IUserGuild[];
}

export default IGuild;
export type { IUserGuild, IUserGuilds };
