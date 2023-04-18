import { useState } from 'react';

const useLocalStorage = <T extends any>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    const value = localStorage.getItem(key);
    if (value === null) {
      localStorage.setItem(key, JSON.stringify(initialValue));
      return initialValue;
    }

    return JSON.parse(value);
  });

  const setValueToLocalStorage = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
    setValue(value);
  };

  return [value, setValueToLocalStorage] as const;
};

export default useLocalStorage;
