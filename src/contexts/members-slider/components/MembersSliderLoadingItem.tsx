import { useEffect, useState } from 'react';
import ProfilePicture from '../../../pages/channels/components/ProfilePicture';

const MINIMUM_WIDTH_PERCENT = 30;
const MAXIMUM_WIDTH_PERCENT = 80;
const WIDTH_MULTIPLIER = 5;

const MembersSliderLoadingItem = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const multiplier =
      (MAXIMUM_WIDTH_PERCENT - MINIMUM_WIDTH_PERCENT) / WIDTH_MULTIPLIER;
    const width =
      Math.floor(Math.random() * multiplier) * WIDTH_MULTIPLIER +
      MINIMUM_WIDTH_PERCENT;

    setWidth(width);
  }, []);

  return (
    <li className="h-15 flex items-center gap-2.5">
      <ProfilePicture className="h-9 w-9 shrink-0" user={undefined} />
      <div
        style={{ width: `${width}%` }}
        className="skeleton-loading h-5 w-[100%] rounded-full"
      />
    </li>
  );
};

export default MembersSliderLoadingItem;
