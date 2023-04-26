import { useLocation } from 'react-router-dom';
import { IconEllipsisHorizontal, IconUserPlus } from '../../../assets/icons';
import SidebarCategory from './SidebarCategory';
import { useMemo } from 'react';
import useGuild from '../../../types/guild/hooks/useGuild';
import useCategories from '../../../types/category/hooks/useCategories';
import { usePartialModal } from '../../partial-screen-modal/PartialScreenModalContext';
import InvitePartialModal from '../../../components/invite-partial-modal/InvitePartialModal';
import GuildPartialModal from './modals/GuildPartialModal';
import GuildListener from '../../../components/GuildListener';
import SidebarCategoryLoading from './SidebarCategoryLoading';

const SidebarGuild = () => {
  const location = useLocation().pathname;
  const guildId = useMemo(
    () => location.match(/\/channels\/\d+/)?.[0].substring('/channels/'.length),
    [location]
  );
  const [guild] = useGuild(guildId);
  const [categories] = useCategories(guild?.categoriesId);
  const [openPartialModal] = usePartialModal();

  const handleOpenGuildPartialModal = () => {
    openPartialModal(<GuildPartialModal guildId={guild?.id} />);
  };

  const handleOpenInvitePartialModal = () => {
    openPartialModal(<InvitePartialModal guild={guild} />);
  };

  return (
    <div className="overflow-x-hidden py-4">
      <GuildListener guildId={guild?.id} />

      <header className="mx-4 mb-6">
        <div
          onClick={handleOpenGuildPartialModal}
          className="mb-4 flex items-center gap-2"
        >
          <div className="text-lg font-bold">{guild?.name}</div>
          <button className="ml-auto">
            <IconEllipsisHorizontal className="h-6 w-6" strokeWidth={2.2} />
          </button>
        </div>

        <button
          onClick={handleOpenInvitePartialModal}
          className="flex w-full items-center justify-center gap-1.5 rounded bg-background-100 px-4 py-1 font-semibold"
        >
          <IconUserPlus className="h-4 w-4" />
          Invite
        </button>
      </header>

      <ul>
        {guild && categories
          ? categories.categories.map((category) => (
              <SidebarCategory
                key={`${category.name}-${guild.id}`}
                guild={guild}
                category={category}
              />
            ))
          : Array(12)
              .fill(undefined)
              .map((_, index) => <SidebarCategoryLoading key={index} />)}
      </ul>
    </div>
  );
};

export default SidebarGuild;
