import useUserGuilds from '../../../types/user/hooks/useUserGuilds';
import { useCurrentUser } from '../../current-user/CurrentUserContext';
import SidebarGuildListItem from './SidebarGuildListItem';
import SidebarGuildListLoadingItem from './SidebarGuildListLoadingItem';

const SidebarGuildList = () => {
  const [user] = useCurrentUser();
  const [guilds] = useUserGuilds(user?.guildsId);

  return (
    <ul className="mb-2 flex flex-col gap-2 empty:mb-0">
      {guilds?.guildsList.map((guild) => (
        <SidebarGuildListItem key={guild.guildId} guildId={guild.guildId} />
      )) ??
        Array(16)
          .fill(undefined)
          .map((_, index) => <SidebarGuildListLoadingItem key={index} />)}
    </ul>
  );
};

export default SidebarGuildList;
