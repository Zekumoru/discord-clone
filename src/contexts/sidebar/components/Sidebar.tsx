import {
  IconCog6Tooth,
  IconUserBars,
  IconUserGroupOutline,
} from '../../../assets/icons';

type SidebarProps = {
  isOpen: boolean;
  close: () => void;
};

const Sidebar = ({ isOpen, close }: SidebarProps) => {
  return (
    <div
      className={`fixed bottom-0 top-0 z-50 flex ${
        isOpen ? 'left-0 right-0' : '-left-full'
      }`}
    >
      <div className="sidebar w-80 bg-background-500 shadow-material">
        <div className="flex flex-col items-center bg-background-700 px-2.5 py-4">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-warmblue-100">
            <IconUserGroupOutline className="h-7 w-7" />
          </div>

          <div className="my-3 w-8 border-b border-b-background-100" />

          <ul className="mb-2 flex flex-col gap-2">
            <li className="h-11 w-11 rounded-2xl bg-background-100" />
            <li className="h-11 w-11 rounded-full bg-background-100" />
            <li className="h-11 w-11 rounded-full bg-background-100" />
          </ul>

          <div className="grid h-11 w-11 place-items-center rounded-full bg-background-100">
            <span className="font-base text-3xl text-jade-100">+</span>
          </div>
        </div>

        <div className="px-3 py-4 font-medium text-silvergrey-400">
          <div className="mb-4 flex items-center gap-3 p-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-background-100 text-white">
              <IconUserBars className="h-6 w-6" />
            </div>

            <div>Friends</div>
          </div>

          <div className="heading-2 mb-2 px-2">Direct Messages</div>

          <ul>
            <li className="flex items-center gap-3 rounded bg-background-100 px-2.5 py-1.5">
              <span className="inline-block h-9 w-9 rounded-full bg-slate-600" />
              <span>User</span>
            </li>
            <li className="flex items-center gap-3 rounded px-2.5 py-1.5">
              <span className="inline-block h-9 w-9 rounded-full bg-background-100" />
              <span>User</span>
            </li>
            <li className="flex items-center gap-3 rounded px-2.5 py-1.5">
              <span className="inline-block h-9 w-9 rounded-full bg-background-100" />
              <span>User</span>
            </li>
          </ul>
        </div>

        <div className="col-span-2 flex items-center gap-3 border-t border-t-background-100 px-4 py-3 text-silvergrey-300">
          <div className="h-10 w-10 shrink-0 rounded-full bg-background-100" />

          <div className="min-w-0">
            <div className="truncate leading-none text-white">User</div>
            <div className="text-xs">#0000</div>
          </div>

          <div className="ml-auto p-2">
            <IconCog6Tooth className="h-6 w-6" />
          </div>
        </div>
      </div>

      <div className="grow" onClick={close} />
    </div>
  );
};

export default Sidebar;
