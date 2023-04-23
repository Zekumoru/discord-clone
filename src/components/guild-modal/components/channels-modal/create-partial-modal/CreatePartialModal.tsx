import { PartialScreenModalProps } from '../../../../../contexts/partial-screen-modal/PartialScreenModalContext';
import CreateCategoryListItem from './CreateCategoryListItem';
import CreateChannelListItem from './CreateChannelListItem';

type CreatePartialModalProps = {
  categoriesId: string;
} & PartialScreenModalProps;

const CreatePartialModal = ({
  categoriesId,
  close,
}: CreatePartialModalProps) => {
  return (
    <div className="w-full overflow-hidden rounded-t-lg bg-background-300">
      <div className="bg-background-700 p-4 font-bold">Create</div>

      <ul>
        <CreateCategoryListItem close={close} categoriesId={categoriesId} />
        <CreateChannelListItem close={close} categoriesId={categoriesId} />
      </ul>
    </div>
  );
};

export default CreatePartialModal;
