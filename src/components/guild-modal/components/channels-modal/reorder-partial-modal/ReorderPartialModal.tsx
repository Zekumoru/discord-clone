import ReorderCategoryListItem from './ReorderCategoryListItem';
import ReorderChannelListItem from './ReorderChannelListItem';

type ReorderPartialModalProps = {
  categoriesId: string;
};

const ReorderPartialModal = ({ categoriesId }: ReorderPartialModalProps) => {
  return (
    <div className="w-full overflow-hidden rounded-t-lg bg-background-300">
      <div className="bg-background-700 p-4 font-bold">Reorder</div>

      <ul>
        <ReorderCategoryListItem categoriesId={categoriesId} />
        <ReorderChannelListItem categoriesId={categoriesId} />
      </ul>
    </div>
  );
};

export default ReorderPartialModal;
