import { IconXMark } from '../assets/icons';

type CircledXButtonProps = {
  size?: 'normal' | 'small';
  onClick?: () => void;
};

const CircledXButton = ({ onClick, size }: CircledXButtonProps = {}) => {
  return (
    <div
      onClick={onClick}
      className={`grid place-content-center rounded-full bg-silvergrey-300 ${
        size === 'small' ? 'h-4 w-4' : 'h-5 w-5'
      }`}
    >
      <IconXMark
        strokeWidth={3}
        className={`text-background-700 ${
          size === 'small' ? 'h-2.5 w-2.5' : 'h-3.5 w-3.5'
        }`}
      />
    </div>
  );
};

export default CircledXButton;
