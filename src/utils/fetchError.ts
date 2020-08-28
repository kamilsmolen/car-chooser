export class FetchError extends Error {
  constructor(status: any, statusText: any) {
    super(`${status} ${statusText}`);

    this.name = 'FetchError';

    Object.setPrototypeOf(this, FetchError.prototype);
  }
}