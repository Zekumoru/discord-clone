import useRandomWidth from '../../../components/useRandomWidth';
import SidebarChannelLoading from './SidebarChannelLoading';
import useRandomNumber from '../../../hooks/useRandomNumber';

const MIN_LOADING_ITEMS = 2;
const MAX_LOADING_ITEMS = 8;

const SidebarCategoryLoading = () => {
  const number = useRandomNumber(MAX_LOADING_ITEMS, MIN_LOADING_ITEMS);
  const width = useRandomWidth();

  return (
    <li className="mx-4 mb-6 last-of-type:mb-2">
      <div
        style={{ width: `${width}%` }}
        className="skeleton-loading mb-2 h-3 rounded-full"
      />

      <ul>
        {Array(number)
          .fill(undefined)
          .map((_, index) => (
            <SidebarChannelLoading key={index} />
          ))}
      </ul>
    </li>
  );
};

export default SidebarCategoryLoading;
