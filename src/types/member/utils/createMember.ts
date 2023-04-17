import IMember from '../Member';

const createMember = (userId: string, roleId: string): IMember => {
  return {
    userId,
    roleId,
  };
};

export default createMember;
