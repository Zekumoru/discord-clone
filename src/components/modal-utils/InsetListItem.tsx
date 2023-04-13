import { ReactNode } from 'react';

type InsetListItemProps = {
  prefix?: ReactNode;
  postfix?: ReactNode;
  children?: ReactNode;
  className?: string;
};

const InsetListItem = ({
  children,
  prefix,
  postfix,
  className,
}: InsetListItemProps = {}) => {
  return (
    <li className="li-rule-4 flex items-center gap-2.5 border-background-100 bg-background-500 px-4 py-2.5 font-semibold text-silvergrey-300 after:border-background-500">
      {prefix && <span className="text-silvergrey-600">{prefix}</span>}
      <span
        className={`flex min-h-[24px] items-center capitalize leading-none ${
          className ?? ''
        }`}
      >
        {children}
      </span>
      {postfix && <span className="ml-auto">{postfix}</span>}
    </li>
  );
};

export default InsetListItem;
