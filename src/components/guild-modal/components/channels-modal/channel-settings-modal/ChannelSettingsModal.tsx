import { ScreenModalProps } from '../../../../../contexts/screen-modal/ScreenModalContext';
import ScreenModalToolbar from '../../../../../contexts/screen-modal/components/ScreenModalToolbar';
import IChannel from '../../../../../types/channel/Channel';
import InsetList from '../../../../modal-utils/InsetList';
import InsetTextInput from '../../../../modal-utils/InsetTextInput';
import ModalCloseButton from '../../../../modal-utils/ModalCloseButton';
import useChannelNameChange from '../../../../../contexts/sidebar/components/modals/hooks/useChannelNameChange';
import InsetChevronListItem from '../../../../modal-utils/InsetChevronListItem';
import { IconFolderPlus } from '../../../../../assets/icons';
import { useCategoriesId } from '../../../../../types/category/contexts/CategoriesIdContext';
import useCategories from '../../../../../types/category/hooks/useCategories';
import { useMemo } from 'react';
import useCategoryName from '../../../hooks/useCategoryName';
import useUpdateChannelName from '../../../hooks/useUpdateChannelName';
import LoadingScreen from '../../../../LoadingScreen';
import { toast } from 'react-toastify';
import DiscordError from '../../../../../utils/DiscordError';

type ChannelSettingsModalProps = {
  channel: IChannel;
} & ScreenModalProps;

const ChannelSettingsModal = ({
  channel,
  close,
}: ChannelSettingsModalProps) => {
  const categoriesId = useCategoriesId();
  const [categories] = useCategories(categoriesId);
  const categoryName = useCategoryName(categories, channel);
  const [channelName, handleChannelNameChange] = useChannelNameChange(
    channel.name
  );
  const hasChanges = channelName !== channel.name && channelName !== '';
  const { mutate: updateChannelName, isLoading } = useUpdateChannelName({
    onSuccess: () => {
      toast.success('Channel name updated successfully!');
      close();
    },
    onError: (error) => {
      if (!(error instanceof DiscordError)) {
        toast.error('An unknown error has occurred!');
        return;
      }

      toast.error(error.message);
    },
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

  return (
    <div className="mb-4">
      {isLoading && <LoadingScreen />}

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
          placeholder="new-channel"
          onChange={handleChannelNameChange}
          maxLength={48}
        />
      </InsetList>

      <InsetList>
        <InsetChevronListItem
          labelPrefix={
            <IconFolderPlus className="h-6 w-6 text-silvergrey-400" />
          }
          label="Category"
          value={categoryName}
        />
      </InsetList>
    </div>
  );
};

export default ChannelSettingsModal;
