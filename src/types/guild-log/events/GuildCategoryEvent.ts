interface IGuildCategoryEventBase {
  type:
    | 'channel-created'
    | 'category-created'
    | 'channel-deleted'
    | 'category-deleted'
    | 'categories-reordered';
  categoriesId: string;
}

interface IGuildChannelsReorderEvent {
  type: 'channels-reordered';
  categoriesId: string;
  categoryId: string;
}

type TGuildCategoryEvent = IGuildCategoryEventBase | IGuildChannelsReorderEvent;

export default TGuildCategoryEvent;
export type { IGuildCategoryEventBase, IGuildChannelsReorderEvent };
