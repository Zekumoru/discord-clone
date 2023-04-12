import { useLocation } from 'react-router-dom';
import { IconUserGroupOutline } from '../../../assets/icons';

const SidebarGuildList = () => {
  const location = useLocation().pathname;
  const isMePage = location.includes('/channels/@me');

  return (
    <div className="flex flex-col items-center bg-background-700 px-2.5 py-4">
      <div
        className={`grid h-11 w-11 place-items-center bg-warmblue-100 ${
          isMePage ? 'rounded-2xl' : 'rounded-full'
        }`}
      >
        <IconUserGroupOutline className="h-7 w-7" />
      </div>

      <div className="my-3 w-8 border-b border-b-background-100" />

      <ul className="mb-2 flex flex-col gap-2 empty:mb-0"></ul>

      <div className="grid h-11 w-11 place-items-center rounded-full bg-background-100">
        <span className="font-base text-3xl text-jade-100">+</span>
      </div>
    </div>
  );
};

export default SidebarGuildList;
