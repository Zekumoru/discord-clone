import IconUserPlus from '../../../../assets/icons/IconUserPlus';
import Toolbar from '../../components/Toolbar';

const Friends = () => {
  return (
    <div>
      <Toolbar buttons={<IconUserPlus className="h-6 w-6" />}>Friends</Toolbar>
    </div>
  );
};

export default Friends;
