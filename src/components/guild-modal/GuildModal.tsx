import PartialScreenModalProvider from '../../contexts/partial-screen-modal/PartialScreenModalContext';
import { ScreenModalProps } from '../../contexts/screen-modal/ScreenModalContext';
import ScreenModalToolbar from '../../contexts/screen-modal/components/ScreenModalToolbar';
import GuildIdProvider from '../../types/guild/contexts/GuildIdContext';
import useGuild from '../../types/guild/hooks/useGuild';
import InsetList from '../modal-utils/InsetList';
import ModalCloseButton from '../modal-utils/ModalCloseButton';
import ChannelsListItem from './components/ChannelsListItem';
import EditGuildPicture from './components/EditGuildPicture';
import MembersListItem from './components/MembersListItem';
import OverviewListItem from './components/OverviewListItem';

type GuildModalProps = {
  guildId: string | undefined;
} & ScreenModalProps;

const GuildModal = ({ guildId, close }: GuildModalProps) => {
  const [guild] = useGuild(guildId);

  return (
    <PartialScreenModalProvider>
      <GuildIdProvider guildId={guildId}>
        <div className="mb-4">
          <ScreenModalToolbar leftElement={<ModalCloseButton close={close} />}>
            Server Settings
          </ScreenModalToolbar>
          <div className="mb-8 bg-background-500 px-4 pb-6 pt-10 text-center">
            <EditGuildPicture guild={guild} />
            <h1 className="mt-2 text-lg font-medium">{guild?.name}</h1>
          </div>
          <div className="heading-2 mx-4 mb-2">Settings</div>
          <InsetList className="mb-8">
            <OverviewListItem />
            <ChannelsListItem categoriesId={guild?.categoriesId} />
          </InsetList>
          <div className="heading-2 mx-4 mb-2">User Management</div>
          <InsetList>
            <MembersListItem />
          </InsetList>
        </div>
      </GuildIdProvider>
    </PartialScreenModalProvider>
  );
};

export default GuildModal;
