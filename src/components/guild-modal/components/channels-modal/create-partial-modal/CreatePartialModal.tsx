import { PartialScreenModalProps } from '../../../../../contexts/partial-screen-modal/PartialScreenModalContext';
import ScreenModalProvider from '../../../../../contexts/screen-modal/ScreenModalContext';
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

      <ScreenModalProvider>
        <ul>
          <CreateCategoryListItem close={close} categoriesId={categoriesId} />
          <CreateChannelListItem close={close} categoriesId={categoriesId} />
        </ul>
      </ScreenModalProvider>
    </div>
  );
};

export default CreatePartialModal;
