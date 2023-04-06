import { format } from 'date-fns';
import IUser from '../../../types/user/User';
import PartialModalRoundedDiv from '../../../contexts/partial-screen-modal/components/PartialModalRoundedDiv';

type AdditionalInfoProps = {
  user: IUser | undefined;
};

const AdditionalInfo = ({ user }: AdditionalInfoProps) => {
  return (
    <PartialModalRoundedDiv>
      <div className="px-4">
        <div className="heading-2 mb-2.5">Discord member since</div>
        <div>
          {user && format(user.creationTimestamp.toDate(), 'MMM d, yyyy')}
        </div>
      </div>
    </PartialModalRoundedDiv>
  );
};

export default AdditionalInfo;
