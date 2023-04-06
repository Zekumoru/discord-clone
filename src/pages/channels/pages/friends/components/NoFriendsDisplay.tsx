const NoFriendsDisplay = () => {
  return (
    <div className="h-screen-toolbar flex flex-col items-center justify-center py-4">
      <img
        className="mb-2 h-40 w-40"
        src="https://sticker-collection.com/stickers/animated/HelloWumpus/whatsapp/f884a104-fdcd-4b9e-893e-707e5a7cca44file_3674657.webp"
        alt="Sad Wumpus"
      />
      <div className="font-medium text-silvergrey-300">
        Uh oh! You do not have any friends...
      </div>
    </div>
  );
};

export default NoFriendsDisplay;
