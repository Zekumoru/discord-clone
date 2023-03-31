import { OutlineIconProps } from './types';

const IconCheck = ({ className, strokeWidth }: OutlineIconProps) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth ?? 1}
      stroke="currentColor"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
};

export default IconCheck;
