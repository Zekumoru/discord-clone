import IconProps from './types';

const IconCategories = ({ className }: IconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      className={className ?? ''}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <rect height="4" width="6" y="3.2995" x="3.16245" />
        <rect height="4" width="6" y="16.37882" x="14.07904" />
        <rect height="4" width="6" y="9.37572" x="14.07904" />
        <path d="m4.55467,8.80178l0.04382,10.80628l8.06603,0.06142l0.02279,-2.10977l-5.18796,0.00891l0.04557,-4.99525l5.10375,-0.03653l0.02279,-1.83646l-5.14932,0.00891l-0.02279,-1.9225l-2.94468,0.01499z" />
      </g>
    </svg>
  );
};

export default IconCategories;
