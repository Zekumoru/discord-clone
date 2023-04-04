import snowflakeId from '../snowflakeId';

describe('snowflakeId', () => {
  it('should generate a string of numbers as id', () => {
    const id = snowflakeId();

    expect(id).toMatch(/^\d*$/);
  });
});
