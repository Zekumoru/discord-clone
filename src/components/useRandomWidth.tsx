import { useEffect, useState } from 'react';
import randomWidth, { RandomWidthOptions } from '../utils/randomWidth';

const useRandomWidth = (options?: RandomWidthOptions) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(randomWidth(options));
  }, []);

  return width;
};

export default useRandomWidth;
