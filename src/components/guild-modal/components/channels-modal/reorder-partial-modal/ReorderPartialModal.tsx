import ReorderCategoryListItem from './ReorderCategoryListItem';
import ReorderChannelListItem from './ReorderChannelListItem';

const ReorderPartialModal = () => {
  return (
    <div className="w-full overflow-hidden rounded-t-lg bg-background-300">
      <div className="bg-background-700 p-4 font-bold">Reorder</div>

      <ul>
        <ReorderCategoryListItem />
        <ReorderChannelListItem />
      </ul>
    </div>
  );
};

export default ReorderPartialModal;
