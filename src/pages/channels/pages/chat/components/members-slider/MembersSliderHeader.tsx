import { ReactNode } from 'react';

type MembersSliderHeaderProps = {
  prefix?: string;
  children: ReactNode;
};

const MembersSliderHeader = ({
  children,
  prefix,
}: MembersSliderHeaderProps) => {
  return (
    <div className="flex gap-1.5 bg-background-500 p-4 text-xl font-medium">
      {prefix && <span className="text-silvergrey-300">{prefix}</span>}
      <span className="truncate font-semibold text-white">{children}</span>
    </div>
  );
};

export default MembersSliderHeader;
export type { MembersSliderHeaderProps };
