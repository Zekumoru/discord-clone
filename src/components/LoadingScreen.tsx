const LoadingScreen = () => {
  return (
    <div className="fixed left-0 top-0 z-[1000] grid min-h-screen w-full place-content-center bg-background-800 bg-opacity-40">
      <div className="loading-circle" />
    </div>
  );
};

export default LoadingScreen;
