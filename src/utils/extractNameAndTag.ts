const extractNameAndTag = (username: string) => {
  const hashIndex = username.lastIndexOf('#');
  const name = username.substring(0, hashIndex);
  const tag = username.substring(hashIndex + 1);

  return [name, tag];
};

export default extractNameAndTag;
