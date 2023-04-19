import {
  IconChevronDown,
  IconChevronRight,
  IconPlus,
} from '../../../assets/icons';
import ICategory from '../../../types/category/Category';
import SidebarChannel from './SidebarChannel';
import useLocalStorage from '../../../hooks/useLocalStorage';
import IGuild from '../../../types/guild/Guild';
import { useScreenModal } from '../../screen-modal/ScreenModalContext';
import CreateChannelModal from '../../../components/CreateChannelModal';
import useIsCurrentUserGuildOwner from '../../../types/guild/hooks/useIsCurrentUserGuildOwner';

type SidebarCategoryProps = {
  guild: IGuild;
  category: ICategory;
};

const SidebarCategory = ({ guild, category }: SidebarCategoryProps) => {
  const [openModal, closeModal] = useScreenModal();
  const isOwner = useIsCurrentUserGuildOwner(guild.id);
  const [collapsed, setCollapsed] = useLocalStorage(
    `collapsed-${category.name}-${guild.id}`,
    false
  );

  const collapseChannels = () => {
    setCollapsed(!collapsed);
  };

  const openCreateChannelModal = () => {
    openModal(
      <CreateChannelModal
        categoriesId={guild.categoriesId}
        categoryName={category.name}
        close={closeModal}
      />
    );
  };

  return (
    <li className="mb-6 last-of-type:mb-2">
      <div className="mb-2 ml-1 mr-2 flex items-center gap-0.5 text-silvergrey-400">
        <button onClick={collapseChannels}>
          {collapsed ? (
            <IconChevronRight className="h-3 w-3" strokeWidth={2} />
          ) : (
            <IconChevronDown className="h-3 w-3" strokeWidth={2} />
          )}
        </button>

        <div
          onClick={collapseChannels}
          className="heading-2 flex-1 text-silvergrey-400"
        >
          {category.name}
        </div>

        {isOwner && (
          <button onClick={openCreateChannelModal} className="ml-auto">
            <IconPlus className="h-4 w-4" strokeWidth={3} />
          </button>
        )}
      </div>

      <ul>
        {category.channels.map((channel) => (
          <SidebarChannel
            key={channel.id}
            guildId={guild.id}
            channel={channel}
            hidden={collapsed}
          />
        ))}
      </ul>
    </li>
  );
};

export default SidebarCategory;
