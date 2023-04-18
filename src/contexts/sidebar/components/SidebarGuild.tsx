import {
  IconChevronDown,
  IconEllipsisHorizontal,
  IconPlus,
  IconUserPlus,
} from '../../../assets/icons';

const SidebarGuild = () => {
  return (
    <div className="overflow-x-hidden py-4">
      <header className="mx-4 mb-6">
        <div className="mb-4 flex items-center gap-2">
          <div className="text-lg font-bold">Bot Development</div>
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
        <li className="mb-6 last-of-type:mb-2">
          <div className="mb-2 ml-1 mr-2 flex items-center gap-0.5 text-silvergrey-400">
            <IconChevronDown className="h-3 w-3" strokeWidth={2} />

            <div className="heading-2 text-silvergrey-400">text channels</div>

            <button className="ml-auto">
              <IconPlus className="h-4 w-4" strokeWidth={3} />
            </button>
          </div>

          <ul>
            <li className="mx-2 mb-0.5 flex items-center gap-2 rounded bg-background-100 px-2 py-0.5 font-medium text-silvergrey-300">
              <span className="text-lg text-silvergrey-400">#</span>
              <span className="font-semibold text-white">general</span>
            </li>
            <li className="mx-2 flex items-center gap-2 rounded px-2 py-0.5 font-medium text-silvergrey-300">
              <span className="text-lg text-silvergrey-400">#</span>
              <span>other-channel</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default SidebarGuild;
