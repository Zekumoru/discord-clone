import { Link, useLocation } from 'react-router-dom';
import GuildPicture from '../../../components/GuildPicture';
import useGuild from '../../../types/guild/hooks/useGuild';

type SidebarGuildListItemProps = {
  guildId: string;
};

const SidebarGuildListItem = ({ guildId }: SidebarGuildListItemProps) => {
  const [guild] = useGuild(guildId);
  const location = useLocation().pathname;
  const isSelected = location.includes(guildId);

  return (
    <li
      className={`h-11 w-11 bg-background-100 ${
        isSelected ? 'rounded-2xl' : 'rounded-full'
      }`}
    >
      <Link to={`/channels/${guildId}`}>
        <GuildPicture
          guild={guild}
          className={`h-11 w-11 ${isSelected ? '!rounded-2xl' : ''}`}
        />
      </Link>
    </li>
  );
};

export default SidebarGuildListItem;
