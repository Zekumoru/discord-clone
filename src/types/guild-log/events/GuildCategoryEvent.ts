interface IGuildCategoryEventBase {
  type: 'category-created' | 'category-deleted';
  categoriesId: string;
  categoryName: string;
}

interface IGuildCategoryReorderEvent {
  type: 'categories-reordered';
  categoriesId: string;
}

interface IGuildCategoryNameUpdatedEvent {
  type: 'category-name-updated';
  categoriesId: string;
  oldName: string;
  newName: string;
}

interface IGuildChannelEventBase {
  type: 'channel-created' | 'channel-deleted';
  categoriesId: string;
  channelName: string;
}

interface IGuildChannelNameUpdatedEvent {
  type: 'channel-name-updated';
  categoriesId: string;
  oldName: string;
  newName: string;
}

type TGuildCategoryEvent =
  | IGuildCategoryEventBase
  | IGuildChannelEventBase
  | IGuildCategoryNameUpdatedEvent
  | IGuildChannelNameUpdatedEvent
  | IGuildCategoryReorderEvent;

export default TGuildCategoryEvent;
export type {
  IGuildCategoryEventBase,
  IGuildChannelEventBase,
  IGuildCategoryNameUpdatedEvent,
  IGuildChannelNameUpdatedEvent,
  IGuildCategoryReorderEvent,
};
