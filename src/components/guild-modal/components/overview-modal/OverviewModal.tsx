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

const OverviewModal = ({ close }: ScreenModalProps) => {
  const guildId = useGuildId();
  const [guild] = useGuild(guildId);
  const [serverName, setServerName] = useState('');

  useEffect(() => {
    if (!guild) return;

    setServerName(guild.name);
  }, [guild]);

  const clearServerNameInput = () => {
    setServerName('');
  };

  return (
    <div className="min-h-screen bg-background-300">
      <OverviewModalToolbar close={close} />

      <div className="heading-2 mx-4 mb-2 mt-10">Server Name</div>
      <InsetList>
        <InsetTextInput
          value={serverName}
          onChange={setServerName}
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
