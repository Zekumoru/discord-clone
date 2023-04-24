import { Timestamp } from 'firebase/firestore';
import TGuildServerEvent from './events/GuildServerEvent';
import IGuildMemberEvent from './events/GuildMemberEvent';
import TGuildCategoryEvent from './events/GuildCategoryEvent';

interface IGuildLogBase {
  type: 'server' | 'member' | 'category';
  id: string;
  guildId: string;
  timestamp: Timestamp | null;
}

interface IGuildServerLog {
  type: 'server';
  event: TGuildServerEvent;
}

interface IGuildMemberLog {
  type: 'member';
  event: IGuildMemberEvent;
}

interface IGuildCategoryLog {
  type: 'category';
  event: TGuildCategoryEvent;
}

type TGuildLog = IGuildLogBase &
  (IGuildServerLog | IGuildMemberLog | IGuildCategoryLog);

export default TGuildLog;
export type {
  IGuildLogBase,
  IGuildServerLog,
  IGuildMemberLog,
  IGuildCategoryLog,
};
