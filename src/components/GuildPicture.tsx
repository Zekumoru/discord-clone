import IGuild from '../types/guild/Guild';
import RoundPicture from './RoundPicture';

type GuildPictureProps = {
  guild: IGuild | undefined;
  className?: string;
  onClick?: () => void;
};

const GuildPicture = ({ guild, className, onClick }: GuildPictureProps) => {
  return (
    <RoundPicture
      text={guild?.name}
      pictureUrl={guild?.pictureUrl}
      className={className}
      onClick={onClick}
    />
  );
};

export default GuildPicture;
