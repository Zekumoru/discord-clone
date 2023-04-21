import { ScreenModalProps } from '../../../screen-modal/ScreenModalContext';
import ScreenModalToolbar from '../../../screen-modal/components/ScreenModalToolbar';
import InsetList from '../../../../components/modal-utils/InsetList';
import ModalCloseButton from '../../../../components/modal-utils/ModalCloseButton';
import useCreateChannel from '../../../../types/channel/hooks/useCreateChannel';
import LoadingScreen from '../../../../components/LoadingScreen';
import DiscordError from '../../../../utils/DiscordError';
import { toast } from 'react-toastify';
import InsetTextInput from '../../../../components/modal-utils/InsetTextInput';
import useChannelNameChange from './hooks/useChannelNameChange';

type CreateChannelModalProps = {
  categoriesId: string;
  categoryName: string;
} & ScreenModalProps;

const CreateChannelModal = ({
  categoriesId,
  categoryName,
  close,
}: CreateChannelModalProps) => {
  const [channelName, handleChannelNameChange] = useChannelNameChange();
  const { mutate: createChannel, isLoading } = useCreateChannel({
    onSuccess: close,
    onError: (error) => {
      if (!(error instanceof DiscordError)) {
        toast.error('An unknown error has occurred!');
        return;
      }

      switch (error.code) {
        case 'already-exists':
          toast.error('Channel name already exists!');
          break;
        default:
          toast.error(error.message);
      }
    },
  });

  const handleCreateChannel = () => {
    createChannel({
      categoriesId,
      categoryName,
      channelName,
    });
  };

  return (
    <div className="mb-4">
      {isLoading && <LoadingScreen />}

      <ScreenModalToolbar
        leftElement={
          <ModalCloseButton className="font-medium text-white" close={close} />
        }
        rightElement={
          <button
            onClick={handleCreateChannel}
            className={`font-medium ${channelName !== '' ? 'text-white' : ''}`}
            disabled={channelName === ''}
          >
            Create
          </button>
        }
      >
        Create Channel
      </ScreenModalToolbar>

      <div className="heading-2 mx-4 mb-2 mt-8">Channel name</div>
      <InsetList>
        <InsetTextInput
          value={channelName}
          placeholder="new-channel"
          onChange={handleChannelNameChange}
          maxLength={48}
        />
      </InsetList>
    </div>
  );
};

export default CreateChannelModal;
