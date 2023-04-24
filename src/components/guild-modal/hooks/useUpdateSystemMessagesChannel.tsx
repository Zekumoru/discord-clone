import { useMutation } from 'react-query';
import IGuild from '../../../types/guild/Guild';
import { setDoc } from 'firebase/firestore';
import guildDoc from '../../../types/guild/firebase/guildDoc';
import { queryClient } from '../../QueryClientInitializer';
import performBatch from '../../../utils/performBatch';
import createServerLog from '../../../types/guild-log/utils/createServerLog';

type UpdateSMChannelOptions = {
  guild: IGuild;
  channelId: string | null;
};

const updateSystemMessagesChannel = async ({
  guild,
  channelId,
}: UpdateSMChannelOptions) => {
  const guildRef = guildDoc(guild.id);

  await performBatch((batch) => {
    batch.set(guildRef, {
      ...guild,
      systemMessagesChannelId: channelId,
    });

    createServerLog(batch, guild.id, {
      type: 'system-messages-channel-updated',
      guildId: guild.id,
      newChannelId: channelId,
      oldChannelId: guild.systemMessagesChannelId,
    });
  });

  await queryClient.invalidateQueries(['guild', guild.id]);
};

type useUpdateSMChannelProps = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

const useUpdateSystemMessagesChannel = ({
  onSuccess,
  onError,
}: useUpdateSMChannelProps = {}) => {
  return useMutation(updateSystemMessagesChannel, {
    onSuccess,
    onError,
  });
};

export default useUpdateSystemMessagesChannel;
