import { ReactNode, createContext, useContext } from 'react';

const CategoriesIdContext = createContext<string | undefined>(undefined);

const useCategoriesId = () => {
  return useContext(CategoriesIdContext);
};

type CategoriesIdProviderProps = {
  categoriesId: string | undefined;
  children: ReactNode;
};

const CategoriesIdProvider = ({
  categoriesId,
  children,
}: CategoriesIdProviderProps) => {
  return (
    <CategoriesIdContext.Provider value={categoriesId}>
      {children}
    </CategoriesIdContext.Provider>
  );
};

export default CategoriesIdProvider;
export { useCategoriesId };
