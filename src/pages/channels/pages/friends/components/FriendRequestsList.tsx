import useUserPartialModal from '../../../../../components/user-partial-modal/hooks/useUserPartialModal';
import { IFriendRequest } from '../../../../../types/friend/Friend';
import FriendAcceptanceItem from './friend-item/FriendAcceptanceItem';
import FriendRequestItem from './friend-item/FriendRequestItem';

type FriendRequestsListProps = {
  requests: IFriendRequest[];
};

const FriendRequestsList = ({ requests }: FriendRequestsListProps) => {
  const [openUserPartialModal] = useUserPartialModal();
  const pendingAcceptances = requests.filter(
    (request) => request.pendingType === 'request'
  );
  const pendingRequests = requests.filter(
    (request) => request.pendingType === 'acceptance'
  );

  return (
    <>
      {pendingAcceptances.length > 0 && (
        <>
          <h2 className="heading-2 mt-4 px-4 first-of-type:mt-0">
            Requests — {pendingAcceptances.length}
          </h2>
          <ul>
            {pendingAcceptances.map((request, index) => (
              <FriendAcceptanceItem
                key={index}
                request={request}
                onClick={() => openUserPartialModal(request.userId)}
              />
            ))}
          </ul>
        </>
      )}

      {pendingRequests.length > 0 && (
        <>
          <h2 className="heading-2 mt-4 px-4 first-of-type:mt-0">
            Your Requests — {pendingRequests.length}
          </h2>
          <ul>
            {pendingRequests.map((request, index) => (
              <FriendRequestItem
                key={index}
                request={request}
                onClick={() => openUserPartialModal(request.userId)}
              />
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default FriendRequestsList;
