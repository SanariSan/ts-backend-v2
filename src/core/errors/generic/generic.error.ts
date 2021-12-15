import type { ERROR_ORIGIN, ERROR_TYPE } from '../error.type';

class GenericError extends Error {
  public name;

  public ERROR_DESCRIPTION: string;

  public ERROR_TIMESTAMP: number;

  public ERROR_TIMESTAMP_HR: Date;

  public ERROR_MESAGE?: string;

  public ERROR_ORIGIN?: ERROR_ORIGIN;

  constructor(ERROR_TYPE: ERROR_TYPE, ERROR_DESCRIPTION) {
    super(ERROR_TYPE);

    // Use when transpiling to es5 to preserve Error class name
    // Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'GenericError';
    this.ERROR_DESCRIPTION = `General error level\n${ERROR_DESCRIPTION}`;
    this.ERROR_TIMESTAMP_HR = new Date();
    this.ERROR_TIMESTAMP = this.ERROR_TIMESTAMP_HR.getTime();
  }

  public static getFormatted(error: Readonly<Error>, oneLine = false): string {
    const parsed = {
      message: error.message,
      stack:
        error.stack !== undefined ? (oneLine ? error.stack.split('\n').join('') : error.stack) : '',
      miscellaneous: JSON.stringify(error, undefined, oneLine ? 0 : 2),
    };

    let formatted = '';

    Object.entries(parsed).forEach(([key, val]) => {
      formatted += `${key}: ${val}${oneLine ? '<*>' : '\n'}`;
    });

    return formatted;
  }
}

export { GenericError };
