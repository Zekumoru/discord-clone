import { useEffect, useMemo, useState } from 'react';
import { useGuildId } from '../../../../types/guild/contexts/GuildIdContext';
import useGuild from '../../../../types/guild/hooks/useGuild';
import InsetList from '../../../modal-utils/InsetList';
import OverviewModalToolbar from './OverviewModalToolbar';
import InsetTextInput from '../../../modal-utils/InsetTextInput';
import CircledXButton from '../../../CircledXButton';
import InsetChevronListItem from '../../../modal-utils/InsetChevronListItem';
import useUpdateGuildName from '../../hooks/useUpdateGuildName';
import LoadingScreen from '../../../LoadingScreen';
import { toast } from 'react-toastify';
import useCategories from '../../../../types/category/hooks/useCategories';
import { usePartialModal } from '../../../../contexts/partial-screen-modal/PartialScreenModalContext';
import SystemMessagesPartialModal from './SystemMessagesPartialModal';
import DeleteGuildListItem from './DeleteGuildListItem';

const OverviewModal = () => {
  const [openPartialModal] = usePartialModal();
  const guildId = useGuildId();
  const [guild] = useGuild(guildId);
  const [guildName, setGuildName] = useState('');
  const [categories] = useCategories(guild?.categoriesId);
  const systemMessagesChannel = useMemo(() => {
    if (!guild || !categories) return;

    for (const category of categories.categories) {
      for (const channel of category.channels) {
        if (channel.id === guild.systemMessagesChannelId) {
          return channel;
        }
      }
    }
  }, [guild, categories]);
  const { mutate: updateGuildName, isLoading } = useUpdateGuildName({
    onSuccess: () => toast.success('Server name updated successfully!'),
  });

  useEffect(() => {
    if (!guild) return;

    setGuildName(guild.name);
  }, [guild]);

  const clearServerNameInput = () => {
    setGuildName('');
  };

  const handleUpdateGuildName = () => {
    if (!guild) {
      toast.error("Could not update server's name!");
      return;
    }

    updateGuildName({
      guild,
      guildName,
    });
  };

  const openSystemMessagesPartialModal = () => {
    if (!guild) {
      toast.error('Could not open modal!');
      return;
    }

    openPartialModal(<SystemMessagesPartialModal guildId={guild.id} />);
  };

  return (
    <div className="mb-4">
      {isLoading && <LoadingScreen />}

      <OverviewModalToolbar
        onSave={handleUpdateGuildName}
        showSaveBtn={
          guildName.trim() !== guild?.name && guildName.trim() !== ''
        }
      />

      <div className="heading-2 mx-4 mb-2 mt-10">Server Name</div>
      <InsetList>
        <InsetTextInput
          value={guildName}
          onChange={setGuildName}
          postfixElement={
            <CircledXButton onClick={clearServerNameInput} size="small" />
          }
        />
      </InsetList>

      <div className="heading-2 mx-4 mb-2 mt-8">System Messages Settings</div>
      <InsetList className="mb-10">
        <InsetChevronListItem
          onClick={openSystemMessagesPartialModal}
          label="Channel"
          value={
            systemMessagesChannel ? `#${systemMessagesChannel.name}` : 'Not set'
          }
        />
      </InsetList>

      <InsetList>
        <DeleteGuildListItem guildId={guildId} />
      </InsetList>
    </div>
  );
};

export default OverviewModal;
