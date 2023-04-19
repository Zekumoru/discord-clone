import { useState } from 'react';
import { ScreenModalProps } from '../contexts/screen-modal/ScreenModalContext';
import ScreenModalToolbar from '../contexts/screen-modal/components/ScreenModalToolbar';
import InsetList from './modal-utils/InsetList';
import InsetListItem from './modal-utils/InsetListItem';
import ModalCloseButton from './modal-utils/ModalCloseButton';
import useCreateChannel from '../types/channel/hooks/useCreateChannel';
import LoadingScreen from './LoadingScreen';
import DiscordError from '../utils/DiscordError';
import { toast } from 'react-toastify';

type CreateChannelModalProps = {
  categoriesId: string;
  categoryName: string;
} & ScreenModalProps;

const CreateChannelModal = ({
  categoriesId,
  categoryName,
  close,
}: CreateChannelModalProps) => {
  const [channelName, setChannelName] = useState('');
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

  const handleChannelNameChange = (channelName: string) => {
    if (channelName === ' ') return;

    const processedName = channelName.toLowerCase().replaceAll(' ', '-');
    if (!processedName.match(/^(\w+-?)*$/)) return;

    setChannelName(processedName);
  };

  const handleCreateChannel = () => {
    createChannel({
      categoriesId,
      categoryName,
      channelName,
    });
  };

  return (
    <div className="min-h-screen bg-background-300">
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
        <InsetListItem>
          <input
            type="text"
            value={channelName}
            onChange={(e) => handleChannelNameChange(e.target.value)}
            className="bg-transparent font-medium text-white outline-none placeholder:text-silvergrey-400"
            placeholder="new-channel"
          />
        </InsetListItem>
      </InsetList>
    </div>
  );
};

export default CreateChannelModal;
