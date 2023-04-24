import { WriteBatch, serverTimestamp } from 'firebase/firestore';
import snowflakeId from '../../../utils/snowflake-id/snowflakeId';
import TGuildLog from '../GuildLog';
import guildLogDoc from '../firebase/guildLogDoc';
import TGuildCategoryEvent from '../events/GuildCategoryEvent';

const createCategoryLog = (
  batch: WriteBatch,
  guildId: string,
  event: TGuildCategoryEvent
): TGuildLog => {
  const id = snowflakeId();
  const log: TGuildLog = {
    id,
    guildId,
    event,
    type: 'category',
    timestamp: null,
  };

  batch.set(guildLogDoc(guildId, log.id), {
    ...log,
    timestamp: serverTimestamp(),
  });

  return log;
};

export default createCategoryLog;
