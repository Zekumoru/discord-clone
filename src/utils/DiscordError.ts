type DiscordErrorCode =
  | 'generic-error'
  | 'user-not-found'
  | 'action-on-self'
  | 'already-sent'
  | 'username-taken'
  | 'missing-role'
  | 'already-joined';

class DiscordError extends Error {
  #code: DiscordErrorCode;

  constructor(code: DiscordErrorCode, message: string) {
    super(message);
    this.name = 'DiscordError';
    this.#code = code;
  }

  get code() {
    return this.#code;
  }
}

export default DiscordError;
