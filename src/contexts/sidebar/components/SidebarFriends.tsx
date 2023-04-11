import { IconUserBars } from '../../../assets/icons';

const SidebarFriends = () => {
  return (
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
  );
};

export default SidebarFriends;
