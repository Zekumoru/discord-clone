import ModalToolbar from '../../../../modal/components/ModalToolbar';
import InsetList from '../../../../../components/modal-utils/InsetList';
import ModalCloseButton from '../../../../../components/modal-utils/ModalCloseButton';
import useCreateChannel from '../../../../../types/channel/hooks/useCreateChannel';
import LoadingScreen from '../../../../../components/LoadingScreen';
import DiscordError from '../../../../../utils/DiscordError';
import { toast } from 'react-toastify';
import InsetTextInput from '../../../../../components/modal-utils/InsetTextInput';
import useChannelNameChange from '../hooks/useChannelNameChange';
import ChangeCategoryListItem from './ChangeCategoryListItem';
import { useState } from 'react';
import { useCloseModal } from '../../../../modal/ModalContext';

type CreateChannelModalProps = {
  categoriesId: string;
  initialCategoryName: string;
};

const CreateChannelModal = ({
  categoriesId,
  initialCategoryName,
}: CreateChannelModalProps) => {
  const close = useCloseModal();
  const [channelName, handleChannelNameChange] = useChannelNameChange();
  const [categoryName, setCategoryName] = useState(initialCategoryName);
  const { mutate: createChannel, isLoading } = useCreateChannel({
    onSuccess: () => {
      toast.success('Channel created successfully!');
      close();
    },
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

      <ModalToolbar
        leftElement={<ModalCloseButton className="font-medium text-white" />}
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
      </ModalToolbar>

      <div className="heading-2 mx-4 mb-2 mt-8">Channel name</div>
      <InsetList className="mb-6">
        <InsetTextInput
          value={channelName}
          placeholder="new-channel"
          onChange={handleChannelNameChange}
          maxLength={48}
        />
      </InsetList>

      <InsetList className="mb-6">
        <ChangeCategoryListItem
          categoryName={categoryName}
          categoriesId={categoriesId}
          onChange={setCategoryName}
        />
      </InsetList>
    </div>
  );
};

export default CreateChannelModal;
