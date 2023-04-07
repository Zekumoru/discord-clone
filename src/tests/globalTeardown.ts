export default async () => {
  const deleteAllUsers = async () => {
    await fetch(
      'http://localhost:3173/emulator/v1/projects/discord-clone-zekumoru/accounts',
      {
        method: 'DELETE',
      }
    );
  };

  const deleteAllCollections = async () => {
    await fetch(
      'http://localhost:3174/emulator/v1/projects/discord-clone-zekumoru/databases/(default)/documents',
      {
        method: 'DELETE',
      }
    );
  };

  await Promise.all([deleteAllUsers(), deleteAllCollections()]);
};
