import useRandomWidth from '../../../components/useRandomWidth';

const SidebarChannelLoading = () => {
  const width = useRandomWidth();

  return (
    <li
      style={{ width: `${width}%` }}
      className="skeleton-loading mb-2 h-5 rounded-full last-of-type:mb-0"
    />
  );
};

export default SidebarChannelLoading;
