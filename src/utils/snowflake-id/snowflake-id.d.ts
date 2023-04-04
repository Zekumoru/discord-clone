declare module 'snowflake-id' {
  export interface SnowflakeOptions {
    mid?: number;
    offset?: number;
  }

  export default class {
    constructor(options?: SnowflakeOptions = { mid: 1, offset: 0 });

    generate: () => string;
  }
}
