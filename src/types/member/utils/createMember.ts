import IMember from '../Member';

const createMember = (
  userId: string,
  roleId: string | null = null
): IMember => {
  return {
    userId,
    roleId,
  };
};

export default createMember;
