type MembersSliderProps = {
  isOpen: boolean;
};

const MembersSlider = ({ isOpen }: MembersSliderProps) => {
  return (
    <div
      className={`fixed bottom-0 ${
        isOpen ? 'right-0' : '-right-80'
      } top-0 z-50 w-80 bg-background-300`}
    >
      Members
    </div>
  );
};

export default MembersSlider;
