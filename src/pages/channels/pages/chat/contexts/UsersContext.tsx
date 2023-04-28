import { ReactNode, createContext, useContext } from 'react';
import IUser from '../../../../../types/user/User';

const UsersContext = createContext<IUser[] | undefined>(undefined);

const useUsers = () => useContext(UsersContext);

type UsersProviderProps = {
  users: IUser[] | undefined;
  children?: ReactNode;
};

const UsersProvider = ({ users, children }: UsersProviderProps) => {
  return (
    <UsersContext.Provider value={users}>{children}</UsersContext.Provider>
  );
};

export default UsersProvider;
export { useUsers };
