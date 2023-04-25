import { ReactNode, createContext, useContext } from 'react';

const MembersIdContext = createContext<string | undefined>(undefined);

const useMembersId = () => useContext(MembersIdContext);

type MembersIdProviderProps = {
  membersId: string | undefined;
  children?: ReactNode;
};

const MembersIdProvider = ({ membersId, children }: MembersIdProviderProps) => {
  return (
    <MembersIdContext.Provider value={membersId}>
      {children}
    </MembersIdContext.Provider>
  );
};

export default MembersIdProvider;
export { useMembersId };
