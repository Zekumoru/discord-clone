import useUserGuilds from '../../../types/user/hooks/useUserGuilds';
import { useCurrentUser } from '../../current-user/CurrentUserContext';
import SidebarGuildListItem from './SidebarGuildListItem';

const SidebarGuildList = () => {
  const [user] = useCurrentUser();
  const [guilds] = useUserGuilds(user?.guildsId);

  return (
    <ul className="mb-2 flex flex-col gap-2 empty:mb-0">
      {guilds?.guildsList &&
        guilds.guildsList.map((guild) => (
          <SidebarGuildListItem key={guild.guildId} guildId={guild.guildId} />
        ))}
    </ul>
  );
};

export default SidebarGuildList;
