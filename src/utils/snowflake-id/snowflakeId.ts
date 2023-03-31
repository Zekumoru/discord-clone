import SnowflakeId from 'snowflake-id';

const SECONDS_IN_A_YEAR = 31_536_000;

const snowflakeId = () => {
  const currentYear = new Date().getFullYear();
  const snowflake = new SnowflakeId({
    mid: Math.floor(Math.random() * 2048),
    offset: (currentYear - 1970) * SECONDS_IN_A_YEAR * 1000,
  });

  return snowflake.generate();
};

export default snowflakeId;
