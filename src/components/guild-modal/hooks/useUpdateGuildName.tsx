import { useMutation } from 'react-query';
import IGuild from '../../../types/guild/Guild';
import guildDoc from '../../../types/guild/firebase/guildDoc';
import { setDoc } from 'firebase/firestore';
import { queryClient } from '../../QueryClientInitializer';
import performBatch from '../../../utils/performBatch';
import createServerLog from '../../../types/guild-log/utils/createServerLog';

type UpdateGuildNameOptions = {
  guild: IGuild;
  guildName: string;
};

const updateGuildName = async ({
  guild,
  guildName,
}: UpdateGuildNameOptions) => {
  const guildRef = guildDoc(guild.id);

  await performBatch((batch) => {
    batch.set(guildRef, {
      ...guild,
      name: guildName,
    });

    createServerLog(batch, guild.id, {
      type: 'name-updated',
      guildId: guild.id,
      newName: guildName,
      oldName: guild.name,
    });
  });

  await queryClient.invalidateQueries(['guild', guild.id]);
};

type UseUpdateGuildNameProps = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

const useUpdateGuildName = ({
  onSuccess,
  onError,
}: UseUpdateGuildNameProps = {}) => {
  return useMutation(updateGuildName, {
    onSuccess,
    onError,
  });
};

export default useUpdateGuildName;
