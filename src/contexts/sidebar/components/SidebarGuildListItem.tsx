import GuildPicture from '../../../components/GuildPicture';
import useGuild from '../../../types/guild/hooks/useGuild';

type SidebarGuildListItemProps = {
  guildId: string;
};

const SidebarGuildListItem = ({ guildId }: SidebarGuildListItemProps) => {
  const [guild] = useGuild(guildId);

  return (
    <li className="h-11 w-11 rounded-full bg-background-100">
      <GuildPicture guild={guild} className="h-11 w-11" />
    </li>
  );
};

export default SidebarGuildListItem;
