interface IGuildServerEventBase {
  type:
    | 'server-created'
    | 'server-deleted'
    | 'picture-updated'
    | 'name-updated'
    | 'system-messages-channel-updated';
  guildId: string;
}

interface IGuildOwnerTransferredEvent {
  type: 'ownership-transferred';
  guildId: string;
  userId: string;
}

type TGuildServerEvent = IGuildServerEventBase | IGuildOwnerTransferredEvent;

export default TGuildServerEvent;
export type { IGuildServerEventBase, IGuildOwnerTransferredEvent };
