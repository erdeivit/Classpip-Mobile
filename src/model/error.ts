export class Error {

  private _name: string;
  private _status: number;
  private _message: string;
  private _statusCode: number;
  private _code: string;

  constructor(name?: string, status?: number, message?: string, statusCode?: number, code?: string) {
    this._name = name;
    this._status = status;
    this._message = message;
    this._statusCode = statusCode;
    this._code = code;
  }

  /* tslint:disable */
  static toObject(object: any): Error {
    /* tslint:enable */
    let result: Error = new Error();
    if (object != null) {
      result.name = object.name;
      result.status = object.status;
      result.message = object.message;
      result.statusCode = object.statusCode;
      result.code = object.code;
    }
    return result;
  }

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  public get status(): number {
    return this._status;
  }

  public set status(value: number) {
    this._status = value;
  }

  public get message(): string {
    return this._message;
  }

  public set message(value: string) {
    this._message = value;
  }

  public get statusCode(): number {
    return this._statusCode;
  }

  public set statusCode(value: number) {
    this._statusCode = value;
  }

  public get code(): string {
    return this._code;
  }

  public set code(value: string) {
    this._code = value;
  }

}
