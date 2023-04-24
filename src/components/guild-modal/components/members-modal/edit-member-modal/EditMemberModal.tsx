import ModalToolbar from '../../../../../contexts/modal/components/ModalToolbar';
import ProfilePicture from '../../../../../pages/channels/components/ProfilePicture';
import useUser from '../../../../../types/user/hooks/useUser';
import extractNameAndTag from '../../../../../utils/extractNameAndTag';
import InsetList from '../../../../modal-utils/InsetList';
import ModalChevronCloseButton from '../../../../modal-utils/ModalChevronCloseButton';
import TransferOwnership from './TransferOwnership';

type EditMemberModalProps = {
  memberId: string | undefined;
};

const EditMemberModal = ({ memberId }: EditMemberModalProps) => {
  const [user] = useUser(memberId);
  const [name] = extractNameAndTag(user?.username ?? '');

  return (
    <div className="mb-4">
      <ModalToolbar
        leftElement={<ModalChevronCloseButton>Members</ModalChevronCloseButton>}
      >
        <span className="block w-40 truncate">Edit {name}</span>
      </ModalToolbar>

      <InsetList className="mb-8 mt-6">
        <li className="flex items-center gap-4 bg-background-500 px-4 py-3.5">
          <ProfilePicture user={user} className="flex-shrink-0" />

          <span className="truncate font-semibold text-silvergrey-300">
            {user?.username}
          </span>
        </li>
      </InsetList>

      <TransferOwnership user={user} />
    </div>
  );
};

export default EditMemberModal;
