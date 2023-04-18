import { useState } from 'react';
import {
  IconChevronDown,
  IconChevronRight,
  IconPlus,
} from '../../../assets/icons';
import ICategory from '../../../types/category/Category';
import SidebarChannel from './SidebarChannel';

type SidebarCategoryProps = {
  category: ICategory;
};

const SidebarCategory = ({ category }: SidebarCategoryProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const collapseChannels = () => {
    setCollapsed(!collapsed);
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

        <button className="ml-auto">
          <IconPlus className="h-4 w-4" strokeWidth={3} />
        </button>
      </div>

      {!collapsed && (
        <ul>
          {category.channels.map((channel) => (
            <SidebarChannel key={channel.id} channel={channel} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default SidebarCategory;
