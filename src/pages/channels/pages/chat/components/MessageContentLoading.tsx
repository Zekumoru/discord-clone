import useRandomNumber from '../../../../../hooks/useRandomNumber';
import MessageContentPartLoading from './MessageContentPartLoading';

const MessageContentLoading = () => {
  const number = useRandomNumber(7, 3);

  return (
    <div className="flex flex-wrap gap-x-2 gap-y-1">
      {Array(number)
        .fill(undefined)
        .map((_, index) => (
          <MessageContentPartLoading key={index} />
        ))}
    </div>
  );
};

export default MessageContentLoading;
