import { useLocation } from 'react-router-dom';
import SidebarFriends from './SidebarFriends';
import SidebarGuilds from './SidebarGuilds';
import SidebarProfile from './SidebarProfile';
import SidebarGuild from './SidebarGuild';
import { useSwipeListener } from '../../SwipeListenerContext';
import { useEffect } from 'react';

type SidebarProps = {
  isOpen: boolean;
  close: () => void;
};

const Sidebar = ({ close, isOpen }: SidebarProps) => {
  const location = useLocation().pathname;
  const isMePage = location.includes('/channels/@me');

  return (
    <div className="sidebar w-80 bg-background-500 shadow-material md:shadow">
      <SidebarGuilds />

      {isMePage ? <SidebarFriends close={close} /> : <SidebarGuild />}

      <SidebarProfile />
    </div>
  );
};

export default Sidebar;
