import { ScreenModalProps } from '../../../../../contexts/screen-modal/ScreenModalContext';
import ScreenModalToolbar from '../../../../../contexts/screen-modal/components/ScreenModalToolbar';
import IChannel from '../../../../../types/channel/Channel';
import InsetList from '../../../../modal-utils/InsetList';
import InsetTextInput from '../../../../modal-utils/InsetTextInput';
import ModalCloseButton from '../../../../modal-utils/ModalCloseButton';
import useChannelNameChange from '../../../../../contexts/sidebar/components/modals/hooks/useChannelNameChange';
import { useCategoriesId } from '../../../../../types/category/contexts/CategoriesIdContext';
import useCategories from '../../../../../types/category/hooks/useCategories';
import useCategoryName from '../../../hooks/useCategoryName';
import useUpdateChannelName from '../../../hooks/useUpdateChannelName';
import LoadingScreen from '../../../../LoadingScreen';
import { toast } from 'react-toastify';
import DiscordError from '../../../../../utils/DiscordError';
import ChangeCategoryListItem from './ChangeCategoryListItem';
import InsetListItem from '../../../../modal-utils/InsetListItem';
import ConfirmationDialog from '../../../../dialog/ConfirmationDialog';
import { useDialog } from '../../../../dialog/Dialog';
import useDeleteChannel from '../../../hooks/useDeleteChannel';

type ChannelSettingsModalProps = {
  channel: IChannel;
} & ScreenModalProps;

const ChannelSettingsModal = ({
  channel,
  close,
}: ChannelSettingsModalProps) => {
  const [dialogRef, openDialog, closeDialog] = useDialog();
  const categoriesId = useCategoriesId();
  const [categories] = useCategories(categoriesId);
  const categoryName = useCategoryName(categories, channel);
  const [channelName, handleChannelNameChange] = useChannelNameChange(
    channel.name
  );
  const hasChanges = channelName !== channel.name && channelName !== '';

  const handleError = (error: unknown) => {
    if (!(error instanceof DiscordError)) {
      toast.error('An unknown error has occurred!');
      return;
    }

    toast.error(error.message);
  };

  const { mutate: updateChannelName, isLoading: updateLoading } =
    useUpdateChannelName({
      onSuccess: () => {
        toast.success('Channel name updated successfully!');
        close();
      },
      onError: handleError,
    });

  const { mutate: deleteChannel, isLoading: deleteLoading } = useDeleteChannel({
    onSuccess: () => {
      toast.success('Channel deleted successfully!');
      closeDialog();
      close();
    },
    onError: handleError,
  });

  const handleUpdateChannelName = () => {
    if (!categories) {
      toast.error('Could not update channel name!');
      return;
    }

    updateChannelName({
      categoriesId: categories.id,
      channelId: channel.id,
      newChannelName: channelName,
    });
  };

  const handleDeleteChannel = () => {
    if (!categories) {
      toast.error('Could not delete channel!');
      return;
    }

    deleteChannel({
      categoriesId: categories.id,
      channelId: channel.id,
    });
  };

  return (
    <div className="mb-4">
      {updateLoading && <LoadingScreen />}

      <ConfirmationDialog
        ref={dialogRef}
        onConfirm={handleDeleteChannel}
        onReject={closeDialog}
        title="Delete Channel"
        loading={deleteLoading}
      >
        Are you sure you want to delete{' '}
        <span className="font-semibold">#{channelName}</span>? This cannot be
        undone.
      </ConfirmationDialog>

      <ScreenModalToolbar
        leftElement={<ModalCloseButton className="font-medium" close={close} />}
        rightElement={
          hasChanges && (
            <button
              onClick={handleUpdateChannelName}
              className={`font-medium text-white`}
            >
              Save
            </button>
          )
        }
      >
        Channel Settings
      </ScreenModalToolbar>

      <div className="heading-2 mx-4 mb-2 mt-8">Channel name</div>
      <InsetList className="mb-10">
        <InsetTextInput
          value={channelName}
          onChange={handleChannelNameChange}
          maxLength={48}
        />
      </InsetList>

      <InsetList className="mb-6">
        <ChangeCategoryListItem channel={channel} categoryName={categoryName} />
      </InsetList>

      <InsetList>
        <InsetListItem onClick={openDialog} className="mx-auto text-salmon-100">
          Delete Channel
        </InsetListItem>
      </InsetList>
    </div>
  );
};

export default ChannelSettingsModal;
