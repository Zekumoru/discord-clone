interface IGuildServerEventBase {
  type: 'server-created' | 'server-deleted' | 'picture-updated';
  guildId: string;
}

interface IGuildNameUpdatedEvent {
  type: 'name-updated';
  guildId: string;
  oldName: string;
  newName: string;
}

interface IGuildSystemMessagesChannelUpdatedEvent {
  type: 'system-messages-channel-updated';
  guildId: string;
  newChannelId: string | null;
  oldChannelId: string | null;
}

interface IGuildOwnerTransferredEvent {
  type: 'ownership-transferred';
  guildId: string;
  newOwnerId: string;
  previousOwnerId: string;
}

type TGuildServerEvent =
  | IGuildServerEventBase
  | IGuildOwnerTransferredEvent
  | IGuildNameUpdatedEvent
  | IGuildSystemMessagesChannelUpdatedEvent;

export default TGuildServerEvent;
export type {
  IGuildServerEventBase,
  IGuildOwnerTransferredEvent,
  IGuildNameUpdatedEvent,
  IGuildSystemMessagesChannelUpdatedEvent,
};
