import createCollection from '../../../utils/firebase/createCollection';
import TGuildLog from '../GuildLog';

const guildLogsCollection = (guildId: string) => {
  return createCollection<TGuildLog>(`guild-logs/${guildId}/logs`);
};

export default guildLogsCollection;
