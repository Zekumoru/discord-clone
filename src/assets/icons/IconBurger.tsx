import { OutlineIconProps } from './types';

const IconBurger = ({ className, strokeWidth }: OutlineIconProps) => {
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
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
};

export default IconBurger;
