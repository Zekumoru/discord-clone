import { WriteBatch, serverTimestamp } from 'firebase/firestore';
import snowflakeId from '../../../utils/snowflake-id/snowflakeId';
import TGuildLog from '../GuildLog';
import TGuildServerEvent from '../events/GuildServerEvent';
import guildLogDoc from '../firebase/guildLogDoc';

const createServerLog = (
  batch: WriteBatch,
  guildId: string,
  event: TGuildServerEvent
): TGuildLog => {
  const id = snowflakeId();
  const log: TGuildLog = {
    id,
    guildId,
    event,
    type: 'server',
    timestamp: null,
  };

  batch.set(guildLogDoc(guildId, log.id), {
    ...log,
    timestamp: serverTimestamp(),
  });

  return log;
};

export default createServerLog;
