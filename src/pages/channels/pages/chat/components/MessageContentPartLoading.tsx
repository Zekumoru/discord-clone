import useRandomWidth from '../../../../../components/useRandomWidth';

const MessageContentPartLoading = () => {
  const width = useRandomWidth({ minPercent: 20, maxPercent: 50 });

  return (
    <div
      style={{ width: `${width}%` }}
      className="skeleton-loading h-3 rounded-full"
    />
  );
};

export default MessageContentPartLoading;
