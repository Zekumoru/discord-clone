import SidebarFriends from './SidebarFriends';
import SidebarGuilds from './SidebarGuilds';
import SidebarProfile from './SidebarProfile';

type SidebarProps = {
  isOpen: boolean;
  close: () => void;
};

const Sidebar = ({ isOpen, close }: SidebarProps) => {
  return (
    <div
      className={`fixed bottom-0 top-0 z-50 flex ${
        isOpen ? 'left-0 right-0' : '-left-full'
      } md:left-0`}
    >
      <div className="sidebar w-80 bg-background-500 shadow-material md:shadow">
        <SidebarGuilds />

        <SidebarFriends close={close} />

        <SidebarProfile />
      </div>

      <div className="grow" onClick={close} />
    </div>
  );
};

export default Sidebar;
