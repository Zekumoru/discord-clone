const originalConsoleError = console.error;

const silentErrors = async (callback: () => Promise<void> | void) => {
  console.error = () => {};

  await callback();

  console.error = originalConsoleError;
};

export default silentErrors;
