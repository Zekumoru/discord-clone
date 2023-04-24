import { WriteBatch, serverTimestamp } from 'firebase/firestore';
import snowflakeId from '../../../utils/snowflake-id/snowflakeId';
import TGuildLog from '../GuildLog';
import guildLogDoc from '../firebase/guildLogDoc';
import IGuildMemberEvent from '../events/GuildMemberEvent';

const createMemberLog = (
  batch: WriteBatch,
  guildId: string,
  event: IGuildMemberEvent
): TGuildLog => {
  const id = snowflakeId();
  const log: TGuildLog = {
    id,
    guildId,
    event,
    type: 'member',
    timestamp: null,
  };

  batch.set(guildLogDoc(guildId, log.id), {
    ...log,
    timestamp: serverTimestamp(),
  });

  return log;
};

export default createMemberLog;
