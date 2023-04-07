import { nanoid } from 'nanoid';
import IUser from '../../types/user/User';
import { User } from 'firebase/auth';

interface TestUser {
  user: IUser;
  email: string;
  password: string;
}

interface FirebaseTestInstance {
  id: string;
  addUser: (user: IUser, email: string, password: string) => void;
  getUsers: () => readonly TestUser[];
}

const createTestInstance = (): FirebaseTestInstance => {
  const id = nanoid();
  const users: TestUser[] = [];

  const addUser = (user: IUser, email: string, password: string) => {
    users.push({ user, email, password });
  };

  const getUsers = (): readonly TestUser[] => {
    return users;
  };

  return {
    id,
    addUser,
    getUsers,
  };
};

export default createTestInstance;
export type { FirebaseTestInstance };
