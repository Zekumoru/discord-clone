import { useEffect, useState } from 'react';

const useRandomNumber = (max: number, min?: number) => {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    const diff = max - (min ?? 0);
    setNumber(Math.floor(Math.random() * diff) + (min ?? 0));
  }, []);

  return number;
};

export default useRandomNumber;
