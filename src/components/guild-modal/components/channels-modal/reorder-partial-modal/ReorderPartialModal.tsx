import { PartialScreenModalProps } from '../../../../../contexts/partial-screen-modal/PartialScreenModalContext';
import ScreenModalProvider from '../../../../../contexts/screen-modal/ScreenModalContext';
import ReorderCategoryListItem from './ReorderCategoryListItem';
import ReorderChannelListItem from './ReorderChannelListItem';

type ReorderPartialModalProps = {
  categoriesId: string;
} & PartialScreenModalProps;

const ReorderPartialModal = ({
  categoriesId,
  close,
}: ReorderPartialModalProps) => {
  return (
    <div className="w-full overflow-hidden rounded-t-lg bg-background-300">
      <div className="bg-background-700 p-4 font-bold">Reorder</div>

      <ScreenModalProvider>
        <ul>
          <ReorderCategoryListItem categoriesId={categoriesId} close={close} />
          <ReorderChannelListItem categoriesId={categoriesId} close={close} />
        </ul>
      </ScreenModalProvider>
    </div>
  );
};

export default ReorderPartialModal;
