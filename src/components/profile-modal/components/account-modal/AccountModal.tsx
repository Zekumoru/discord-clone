import { useCurrentUser } from '../../../../contexts/current-user/CurrentUserContext';
import ModalToolbar from '../../../../contexts/modal/components/ModalToolbar';
import InsetList from '../../../modal-utils/InsetList';
import InsetListItem from '../../../modal-utils/InsetListItem';
import ModalChevronCloseButton from '../../../modal-utils/ModalChevronCloseButton';
import DeleteAccountListItem from './components/DeleteAccountListItem';
import EditPasswordListItem from './components/EditPasswordListItem';
import EditUsernameListItem from './components/EditUsernameListItem';

const AccountModal = () => {
  const [currentUser] = useCurrentUser();

  return (
    <div className="mb-4">
      <ModalToolbar
        leftElement={
          <ModalChevronCloseButton>Overview</ModalChevronCloseButton>
        }
      >
        Account
      </ModalToolbar>

      <div className="heading-2 mb-2 mt-8 px-4">Account Information</div>
      <InsetList>
        <EditUsernameListItem />

        <InsetListItem
          hrRule="rule-4"
          className="ml-auto font-medium normal-case"
          prefix={<span className="text-white">Email</span>}
        >
          {currentUser?.email ?? 'Not set'}
        </InsetListItem>

        <EditPasswordListItem />
      </InsetList>

      <div className="heading-2 mb-2 mt-8 px-4">Account Management</div>
      <InsetList>
        <DeleteAccountListItem />
      </InsetList>
    </div>
  );
};

export default AccountModal;
