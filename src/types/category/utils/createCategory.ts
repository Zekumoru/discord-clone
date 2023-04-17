import snowflakeId from '../../../utils/snowflake-id/snowflakeId';
import IChannel from '../../channel/Channel';
import ICategory from '../Category';

const createCategory = (name: string, channels: string[]): ICategory => {
  return {
    name,
    channels: channels.map<IChannel>((channelName) => ({
      id: snowflakeId(),
      name: channelName,
    })),
  };
};

export default createCategory;
