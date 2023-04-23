import CreateCategoryListItem from './CreateCategoryListItem';
import CreateChannelListItem from './CreateChannelListItem';

const CreatePartialModal = () => {
  return (
    <div className="w-full overflow-hidden rounded-t-lg bg-background-300">
      <div className="bg-background-700 p-4 font-bold">Create</div>

      <ul>
        <CreateCategoryListItem />
        <CreateChannelListItem />
      </ul>
    </div>
  );
};

export default CreatePartialModal;
