import ModalToolbar from '../../contexts/modal/components/ModalToolbar';
import useGuild from '../../types/guild/hooks/useGuild';
import InsetList from '../modal-utils/InsetList';
import ModalCloseButton from '../modal-utils/ModalCloseButton';
import ChannelsListItem from './components/ChannelsListItem';
import EditGuildPicture from './components/EditGuildPicture';
import MembersListItem from './components/MembersListItem';
import OverviewListItem from './components/OverviewListItem';

type GuildModalProps = {
  guildId: string | undefined;
};

const GuildModal = ({ guildId }: GuildModalProps) => {
  const [guild] = useGuild(guildId);

  return (
    <div className="mb-4">
      <ModalToolbar leftElement={<ModalCloseButton />}>
        Server Settings
      </ModalToolbar>
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
  );
};

export default GuildModal;
