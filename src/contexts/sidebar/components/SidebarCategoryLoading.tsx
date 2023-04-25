import { useEffect, useState } from 'react';
import useRandomWidth from '../../../components/useRandomWidth';
import SidebarChannelLoading from './SidebarChannelLoading';

const MIN_LOADING_ITEMS = 2;
const MAX_LOADING_ITEMS = 8;

const SidebarCategoryLoading = () => {
  const [number, setNumber] = useState(0);
  const width = useRandomWidth();

  useEffect(() => {
    const diff = MAX_LOADING_ITEMS - MIN_LOADING_ITEMS;
    setNumber(Math.floor(Math.random() * diff) + MIN_LOADING_ITEMS);
  }, []);

  return (
    <li className="mx-4 mb-6 last-of-type:mb-2">
      <div
        style={{ width: `${width}%` }}
        className="skeleton-loading mb-2 h-3 rounded-full"
      />

      {Array(number)
        .fill(undefined)
        .map((_, index) => (
          <SidebarChannelLoading key={index} />
        ))}
    </li>
  );
};

export default SidebarCategoryLoading;
