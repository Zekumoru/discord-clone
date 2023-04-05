const retrievePathAndDocName = (path: string) => {
  const slashIndex = path.lastIndexOf('/');
  const docName = path.substring(slashIndex + 1);
  const collectionPath = path.substring(0, slashIndex);

  return [collectionPath, docName];
};

export default retrievePathAndDocName;
