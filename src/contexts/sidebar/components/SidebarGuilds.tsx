import { Link, useLocation } from 'react-router-dom';
import { IconUserGroupOutline } from '../../../assets/icons';
import { useModal } from '../../modal/ModalContext';
import CreateGuildModal from '../../../pages/channels/pages/guilds/components/modals/CreateGuildModal';
import SidebarGuildList from './SidebarGuildList';

const SidebarGuilds = () => {
  const [openModal] = useModal();
  const location = useLocation().pathname;
  const isMePage = location.includes('/channels/@me');

  const openCreateGuildModal = () => {
    openModal(<CreateGuildModal />);
  };

  return (
    <div className="flex flex-col items-center bg-background-700 px-2.5 py-4">
      <Link to="/channels/@me">
        <div
          className={`grid h-11 w-11 place-items-center bg-warmblue-100 ${
            isMePage ? 'rounded-2xl' : 'rounded-full'
          }`}
        >
          <IconUserGroupOutline className="h-7 w-7" />
        </div>
      </Link>

      <div className="my-3 w-8 border-b border-b-background-100" />

      <SidebarGuildList />

      <div
        onClick={openCreateGuildModal}
        className="grid h-11 w-11 place-items-center rounded-full bg-background-100"
      >
        <span className="font-base text-3xl text-jade-100">+</span>
      </div>
    </div>
  );
};

export default SidebarGuilds;
