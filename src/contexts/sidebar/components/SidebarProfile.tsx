import { IconCog6Tooth } from '../../../assets/icons';

const SidebarProfile = () => {
  return (
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
  );
};

export default SidebarProfile;
