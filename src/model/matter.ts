export class Matter {

  private _id: string;
  private _name: string;

  constructor(id?: string, name?: string) {
    this._id = id;
    this._name = name;
  }

  /* tslint:disable */
  static toObject(object: any): Matter {
    /* tslint:enable */
    let result: Matter = new Matter();
    if (object != null) {
      result.id = object.id;
      result.name = object.name;
    }
    return result;
  }

  public get id(): string {
    return this._id;
  }

  public set id(value: string) {
    this._id = value;
  }

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

}
