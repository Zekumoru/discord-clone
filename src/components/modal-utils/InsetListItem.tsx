import { ReactNode } from 'react';

type InsetListItemProps = {
  prefix?: ReactNode;
  postfix?: ReactNode;
  children?: ReactNode;
  className?: string;
  hrRule?: 'default' | 'rule-4';
  onClick?: () => void;
};

const InsetListItem = ({
  children,
  prefix,
  postfix,
  className,
  onClick,
  hrRule,
}: InsetListItemProps = {}) => {
  return (
    <li
      onClick={onClick}
      className={`${
        hrRule === 'rule-4'
          ? 'li-rule-4 border-background-100 after:border-background-500'
          : 'li-rule-inset'
      } flex items-center gap-3 bg-background-500 pl-4 font-semibold text-silvergrey-300`}
    >
      {prefix}

      <span
        className={`${
          hrRule === 'rule-4' ? '' : 'li-rule-inset-b'
        } flex flex-1 items-center overflow-hidden py-2.5 pr-4`}
      >
        <span
          className={`flex min-h-[24px] items-center overflow-hidden leading-none ${
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
