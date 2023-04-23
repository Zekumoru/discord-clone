import { useEffect, useState } from 'react';
import { IconMagnifyingGlass } from '../../../../assets/icons';
import ModalToolbar from '../../../../contexts/modal/components/ModalToolbar';
import useMembers from '../../../../types/member/hooks/useMembers';
import useMembersUsers from '../../../../types/member/hooks/useMembersUsers';
import ModalChevronCloseButton from '../../../modal-utils/ModalChevronCloseButton';
import MemberItem from './MemberItem';
import IUser from '../../../../types/user/User';

type MembersModalProps = {
  membersId: string | undefined;
};

const MembersModal = ({ membersId }: MembersModalProps) => {
  const [membersUsers] = useMembersUsers(membersId);
  const [members, setMembers] = useState<IUser[]>();
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (!membersUsers) return;

    setMembers(membersUsers);
  }, [membersUsers]);

  const handleFilter = (filter: string) => {
    setFilter(filter);

    if (filter === '') {
      setMembers(membersUsers);
      return;
    }

    setMembers(
      membersUsers?.filter((member) =>
        member.username.toLowerCase().includes(filter.toLowerCase())
      )
    );
  };

  return (
    <div className="mb-4">
      <ModalToolbar
        leftElement={
          <ModalChevronCloseButton>Server Settings</ModalChevronCloseButton>
        }
      >
        Members
      </ModalToolbar>

      <div className="mb-4 border-b border-background-700 bg-background-500 px-4 py-2.5">
        <div className="flex items-center rounded bg-background-700 px-2.5 py-2">
          <input
            type="text"
            value={filter}
            onChange={(e) => handleFilter(e.target.value)}
            className="flex-1 bg-transparent outline-none placeholder:text-silvergrey-300"
            placeholder="Search"
          />
          <IconMagnifyingGlass className="h-5 w-5 text-silvergrey-400" />
        </div>
      </div>

      <ul>
        {filter !== '' && members?.length === 0 && (
          <li className="mx-4 text-center font-semibold text-silvergrey-400">
            No members were found.
          </li>
        )}
        {members?.map((member) => (
          <MemberItem key={member.id} user={member} />
        ))}
      </ul>
    </div>
  );
};

export default MembersModal;
