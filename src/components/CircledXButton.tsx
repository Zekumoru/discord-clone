import { IconXMark } from '../assets/icons';

type CircledXButtonProps = {
  onClick?: () => void;
};

const CircledXButton = ({ onClick }: CircledXButtonProps = {}) => {
  return (
    <div
      onClick={onClick}
      className="grid h-5 w-5 place-content-center rounded-full bg-silvergrey-300"
    >
      <IconXMark strokeWidth={3} className="h-3.5 w-3.5 text-background-700" />
    </div>
  );
};

export default CircledXButton;
