import createDoc from '../../../utils/firebase/createDoc';
import { IRoles } from '../Role';

const rolesDoc = (id: string) => {
  return createDoc<IRoles>(`roles/${id}`);
};

export default rolesDoc;
