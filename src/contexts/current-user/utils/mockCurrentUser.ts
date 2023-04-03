import { User } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import IUser from '../../../types/user/User';

type OtherUserProps = Pick<IUser, 'email' | 'pictureUrl'>;

type MockCurrentUserOverloads = {
  (id: string, username: string, otherProps?: OtherUserProps): IUser;
  (firebaseUser: User, user: IUser): IUser;
};

const isFirebaseUser = (user: unknown): user is User => {
  return !!user && typeof user === 'object' && 'uid' in user;
};

const isUser = (user: unknown): user is IUser => {
  return !!user && typeof user === 'object' && 'id' in user;
};

const isOtherUserProps = (
  otherProps: unknown
): otherProps is OtherUserProps => {
  return !!otherProps && typeof otherProps === 'object';
};

const mockCurrentUser: MockCurrentUserOverloads = (
  idOrFirebaseUser,
  usernameOrUser,
  otherProps?
) => {
  let firebaseUser = {} as User;
  let user = {} as IUser;

  if (isFirebaseUser(idOrFirebaseUser) && isUser(usernameOrUser)) {
    firebaseUser = idOrFirebaseUser;
    user = usernameOrUser;
  } else if (
    typeof idOrFirebaseUser === 'string' &&
    typeof usernameOrUser === 'string'
  ) {
    const id = idOrFirebaseUser;
    const username = usernameOrUser;

    user = {
      id,
      username,
      email: isOtherUserProps(otherProps) ? otherProps.email : '',
      pictureUrl: isOtherUserProps(otherProps) ? otherProps.pictureUrl : null,
      firebaseId: id,
      friendRequestsId: id,
      friendsId: id,
      guildsId: id,
    };

    firebaseUser = {
      uid: id,
      displayName: username,
      email: isOtherUserProps(otherProps) ? otherProps.email : '',
      photoURL: isOtherUserProps(otherProps) ? otherProps.pictureUrl : null,
    } as User;
  }

  vi.mocked(useAuthState).mockReturnValue([firebaseUser, false, undefined]);

  return user;
};

export default mockCurrentUser;
