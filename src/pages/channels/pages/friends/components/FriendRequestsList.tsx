import useUserPartialModal from '../../../../../components/user-partial-modal/hooks/useUserPartialModal';
import { IFriendRequest } from '../../../../../types/friend/Friend';
import FriendRequestItem from './friend-item/FriendRequestItem';

type FriendRequestsListProps = {
  pendingAcceptances: IFriendRequest[];
};

const FriendRequestsList = ({
  pendingAcceptances,
}: FriendRequestsListProps) => {
  const [openUserPartialModal] = useUserPartialModal();

  return (
    <>
      <h2 className="heading-2 mt-4 px-4 first-of-type:mt-0">
        Requests — {pendingAcceptances.length}
      </h2>
      <ul>
        {pendingAcceptances.map((request, index) => (
          <FriendRequestItem
            key={index}
            request={request}
            onClick={() => openUserPartialModal(request.userId)}
          />
        ))}
      </ul>
    </>
  );
};

export default FriendRequestsList;
