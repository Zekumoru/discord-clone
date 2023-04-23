import CreateCategoryListItem from './CreateCategoryListItem';
import CreateChannelListItem from './CreateChannelListItem';

type CreatePartialModalProps = {
  categoriesId: string;
};

const CreatePartialModal = ({ categoriesId }: CreatePartialModalProps) => {
  return (
    <div className="w-full overflow-hidden rounded-t-lg bg-background-300">
      <div className="bg-background-700 p-4 font-bold">Create</div>

      <ul>
        <CreateCategoryListItem categoriesId={categoriesId} />
        <CreateChannelListItem categoriesId={categoriesId} />
      </ul>
    </div>
  );
};

export default CreatePartialModal;
