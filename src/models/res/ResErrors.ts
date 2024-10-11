export class ResponseError extends Error {
  statusCode: number;
  constructor(code: number, reason: string) {
    super(reason);
    this.statusCode = code;
  }
}

export class AuthorizationError extends ResponseError {
  constructor(reason: string = 'Unauthorized') {
    super(401, reason);
  }
  static reject<T = never>(reason?: string): Promise<T> {
    return Promise.reject<T>(new this(reason));
  }
}
