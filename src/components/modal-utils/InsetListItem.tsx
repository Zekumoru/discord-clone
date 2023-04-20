import { ReactNode } from 'react';

type InsetListItemProps = {
  prefix?: ReactNode;
  postfix?: ReactNode;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
};

const InsetListItem = ({
  children,
  prefix,
  postfix,
  className,
  onClick,
}: InsetListItemProps = {}) => {
  return (
    <li
      onClick={onClick}
      className="li-rule-inset flex items-center gap-3 bg-background-500 pl-4 font-semibold text-silvergrey-300"
    >
      {prefix}

      <span className="li-rule-inset-b flex flex-1 items-center py-2.5 pr-4">
        <span
          className={`flex min-h-[24px] items-center capitalize leading-none ${
            className ?? ''
          }`}
        >
          {children}
        </span>
        {postfix}
      </span>
    </li>
  );
};

export default InsetListItem;
