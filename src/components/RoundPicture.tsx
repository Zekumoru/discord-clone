import getStringColor from '../utils/getStringColor';

type RoundPictureProps = {
  text: string | null | undefined;
  pictureUrl: string | null | undefined;
  className?: string;
  onClick?: () => void;
};

const RoundPicture = ({
  text,
  pictureUrl,
  className,
  onClick,
}: RoundPictureProps) => {
  const bgColor = getStringColor(text);
  const acronyms = [];

  if (text) {
    const splits = text.split(' ').filter(Boolean);
    acronyms.push(splits[0].substring(0, 1));
    if (splits[1]) acronyms.push(splits[1].substring(0, 1));
  }

  return (
    <span
      onClick={onClick}
      className={`grid h-10 w-10 place-content-center rounded-full bg-cover bg-center bg-no-repeat font-medium ${className}`}
      style={{
        backgroundColor: bgColor,
        backgroundImage: pictureUrl ? `url(${pictureUrl})` : '',
      }}
    >
      {!pictureUrl && acronyms.join('')}
    </span>
  );
};

export default RoundPicture;
