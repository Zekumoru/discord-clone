import { useMemo } from 'react';
import { PartialScreenModalProps } from '../../../../contexts/partial-screen-modal/PartialScreenModalContext';
import useCategories from '../../../../types/category/hooks/useCategories';
import useGuild from '../../../../types/guild/hooks/useGuild';
import IChannel from '../../../../types/channel/Channel';
import ChannelListItem from './ChannelListItem';
import useUpdateSystemMessagesChannel from '../../hooks/useUpdateSystemMessagesChannel';
import { toast } from 'react-toastify';
import LoadingScreen from '../../../LoadingScreen';

type SystemMessagesPMProps = {
  guildId: string;
} & PartialScreenModalProps;

const SystemMessagesPartialModal = ({
  guildId,
  close,
}: SystemMessagesPMProps) => {
  const [guild] = useGuild(guildId);
  const [categories] = useCategories(guild?.categoriesId);
  const channels = useMemo(() => {
    if (!categories) return [];

    const channels: IChannel[] = [];
    categories.categories.forEach((category) =>
      channels.push(...category.channels)
    );

    return channels;
  }, [categories]);
  const { mutate: updateSystemMessagesChannel, isLoading } =
    useUpdateSystemMessagesChannel({
      onSuccess: () => {
        toast.success('System messages channel set!');
        close();
      },
      onError: () => toast.error('Could not set system messages channel!'),
    });

  const handleUpdateSystemMessagesChannel = (channelId: string | null) => {
    if (!guild) {
      toast.error('Could not set system messages channel!');
      return;
    }

    updateSystemMessagesChannel({
      guild,
      channelId,
    });
  };

  return (
    <div className="min-h-[85vh] w-full overflow-hidden rounded-t-lg bg-background-500">
      {isLoading && <LoadingScreen />}

      <div className="bg-background-700 p-4 font-semibold">
        Select a Channel
      </div>

      <ul className="m-4 overflow-hidden rounded">
        <li
          onClick={() => handleUpdateSystemMessagesChannel(null)}
          className="bg-background-700 px-4 py-2.5 font-medium"
        >
          No System Messages
        </li>
        {channels.map((channel) => (
          <ChannelListItem
            key={channel.id}
            channel={channel}
            onClick={handleUpdateSystemMessagesChannel}
          />
        ))}
      </ul>
    </div>
  );
};

export default SystemMessagesPartialModal;
