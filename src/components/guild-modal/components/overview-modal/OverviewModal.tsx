import { useEffect, useState } from 'react';
import { ScreenModalProps } from '../../../../contexts/screen-modal/ScreenModalContext';
import { useGuildId } from '../../../../types/guild/contexts/GuildIdContext';
import useGuild from '../../../../types/guild/hooks/useGuild';
import InsetList from '../../../modal-utils/InsetList';
import OverviewModalToolbar from './OverviewModalToolbar';
import InsetTextInput from '../../../modal-utils/InsetTextInput';
import CircledXButton from '../../../CircledXButton';
import InsetListItem from '../../../modal-utils/InsetListItem';
import InsetChevronListItem from '../../../modal-utils/InsetChevronListItem';
import useUpdateGuildName from '../../hooks/useUpdateGuildName';
import LoadingScreen from '../../../LoadingScreen';
import { toast } from 'react-toastify';

const OverviewModal = ({ close }: ScreenModalProps) => {
  const guildId = useGuildId();
  const [guild] = useGuild(guildId);
  const [guildName, setGuildName] = useState('');
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

  return (
    <div className="min-h-screen bg-background-300">
      {isLoading && <LoadingScreen />}

      <OverviewModalToolbar
        onSave={handleUpdateGuildName}
        showSaveBtn={
          guildName.trim() !== guild?.name && guildName.trim() !== ''
        }
        close={close}
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
        <InsetChevronListItem label="Channel" value={'#general'} />
      </InsetList>

      <InsetList>
        <InsetListItem className="mx-auto text-salmon-400">
          Delete Server
        </InsetListItem>
      </InsetList>
    </div>
  );
};

export default OverviewModal;
