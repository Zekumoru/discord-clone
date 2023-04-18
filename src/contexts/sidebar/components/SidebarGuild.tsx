import { useLocation } from 'react-router-dom';
import { IconEllipsisHorizontal, IconUserPlus } from '../../../assets/icons';
import SidebarCategory from './SidebarCategory';
import { useMemo } from 'react';
import useGuild from '../../../types/guild/hooks/useGuild';
import useCategories from '../../../types/category/hooks/useCategories';

const SidebarGuild = () => {
  const location = useLocation().pathname;
  const guildId = useMemo(
    () => location.match(/\/channels\/\d+/)?.[0].substring('/channels/'.length),
    [location]
  );
  const [guild] = useGuild(guildId);
  const [categories] = useCategories(guild?.categoriesId);

  return (
    <div className="overflow-x-hidden py-4">
      <header className="mx-4 mb-6">
        <div className="mb-4 flex items-center gap-2">
          <div className="text-lg font-bold">{guild?.name}</div>
          <button className="ml-auto">
            <IconEllipsisHorizontal className="h-6 w-6" strokeWidth={2.2} />
          </button>
        </div>

        <button className="flex w-full items-center justify-center gap-1.5 rounded bg-background-100 px-4 py-1 font-semibold">
          <IconUserPlus className="h-4 w-4" />
          Invite
        </button>
      </header>

      <ul>
        {categories &&
          categories.categories.map((category) => (
            <SidebarCategory key={category.name} category={category} />
          ))}
      </ul>
    </div>
  );
};

export default SidebarGuild;
