import { ReactNode } from 'react';
import { IconChevronRight } from '../../assets/icons';
import InsetListItem from './InsetListItem';

type InsetChevronListItemProps = {
  onClick?: () => void;
  label?: string;
  value?: string;
  labelPrefix?: ReactNode;
};

const InsetChevronListItem = ({
  onClick,
  label,
  value,
  labelPrefix,
}: InsetChevronListItemProps = {}) => {
  const prefix = label && (
    <>
      {labelPrefix}
      <span className="text-white">{label}</span>
    </>
  );

  return (
    <InsetListItem
      hrRule="rule-4"
      onClick={onClick}
      className="ml-auto text-right font-medium"
      prefix={prefix}
      postfix={
        <IconChevronRight
          className="ml-2 h-4 w-4 flex-shrink-0"
          strokeWidth={3}
        />
      }
    >
      {value}
    </InsetListItem>
  );
};

export default InsetChevronListItem;
