import snowflakeId from '../../../utils/snowflake-id/snowflakeId';
import IRole from '../Role';

const createRole = (name: string): IRole => {
  return {
    name,
    id: snowflakeId(),
  };
};

export default createRole;
