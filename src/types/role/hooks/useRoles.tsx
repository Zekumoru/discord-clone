import { useQuery } from 'react-query';
import rolesDoc from '../firebase/rolesDoc';
import { getDoc } from 'firebase/firestore';

const getRoles = async (rolesId: string) => {
  const rolesRef = rolesDoc(rolesId);

  return (await getDoc(rolesRef)).data()!;
};

const useRoles = (rolesId: string | undefined) => {
  const {
    data: roles,
    isLoading,
    error,
  } = useQuery(['roles', rolesId], async () => await getRoles(rolesId!), {
    enabled: !!rolesId,
  });

  return [roles, isLoading, error] as const;
};

export default useRoles;
