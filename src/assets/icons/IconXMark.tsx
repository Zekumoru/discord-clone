import { OutlineIconProps } from './types';

const IconXMark = ({ className, strokeWidth }: OutlineIconProps) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke="currentColor"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};

export default IconXMark;
