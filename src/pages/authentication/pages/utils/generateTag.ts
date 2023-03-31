const generateTag = (): string => {
  const number = Math.floor(Math.random() * 10_000);

  return String(number).padStart(4, '0');
};

export default generateTag;
