import createDoc from '../../../utils/firebase/createDoc';
import TGuildLog from '../GuildLog';

const guildLogDoc = (guildId: string, guildLogId: string) => {
  return createDoc<TGuildLog>(`guild-logs/${guildId}/logs/${guildLogId}`);
};

export default guildLogDoc;
