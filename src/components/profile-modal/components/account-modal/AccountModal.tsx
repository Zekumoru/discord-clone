import { useCurrentUser } from '../../../../contexts/current-user/CurrentUserContext';
import ScreenModalToolbar from '../../../../contexts/modal/components/ScreenModalToolbar';
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
      <ScreenModalToolbar
        leftElement={
          <ModalChevronCloseButton>Overview</ModalChevronCloseButton>
        }
      >
        Account
      </ScreenModalToolbar>

      <div className="heading-2 mb-2 mt-8 px-4">Account Information</div>
      <InsetList>
        <EditUsernameListItem />

        <InsetListItem
          hrRule="rule-4"
          className="ml-auto font-medium normal-case"
          prefix={<span className="text-white">Email</span>}
        >
          {currentUser?.email}
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
