import { customAlphabet } from 'nanoid';

const CHARACTERS =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const nanoid = customAlphabet(CHARACTERS, 8);

const generateInviteId = () => {
  return nanoid();
};

export default generateInviteId;
