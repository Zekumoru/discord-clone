import { useLocation } from 'react-router-dom';
import SidebarFriends from './SidebarFriends';
import SidebarGuilds from './SidebarGuilds';
import SidebarProfile from './SidebarProfile';
import SidebarGuild from './SidebarGuild';

type SidebarProps = {
  isOpen: boolean;
  close: () => void;
};

const Sidebar = ({ isOpen, close }: SidebarProps) => {
  const location = useLocation().pathname;
  const isMePage = location.includes('/channels/@me');

  return (
    <div
      className={`fixed bottom-0 top-0 z-50 flex ${
        isOpen ? 'left-0 right-0' : '-left-full'
      } md:left-0`}
    >
      <div className="sidebar w-80 bg-background-500 shadow-material md:shadow">
        <SidebarGuilds />

        {isMePage ? <SidebarFriends close={close} /> : <SidebarGuild />}

        <SidebarProfile />
      </div>

      <div className="grow" onClick={close} />
    </div>
  );
};

export default Sidebar;
