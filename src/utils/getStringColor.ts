import uniqolor from 'uniqolor';
import { nanoid } from 'nanoid';

const getStringColor = (string: string | null | undefined) => {
  return uniqolor(string ?? nanoid(), {
    saturation: [30, 40],
    lightness: [25, 40],
  }).color;
};

export default getStringColor;
