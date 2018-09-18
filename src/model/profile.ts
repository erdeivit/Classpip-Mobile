import { Avatar } from './avatar'

export class Profile {

  private _id: string;
  private _username: string;
  private _name: string;
  private _surname: string;
  private _email: string;
  private _avatarId: number;
  private _avatar: Avatar;

  constructor(id?: string, username?: string, name?: string, surname?: string,
    email?: string, avatarId?: number, avatar?: Avatar) {
    this._id = id;
    this._username = username;
    this._name = name;
    this._surname = surname;
    this._email = email;
    this._avatarId = avatarId;
    this._avatar = avatar;
  }

  /* tslint:disable */
  static toObject(object: any): Profile {
    /* tslint:enable */
    let result: Profile = new Profile();
    if (object != null) {
      result.id = object.id;
      result.username = object.username;
      result.name = object.name;
      result.surname = object.surname;
      result.email = object.email;
      result.avatarId = object.avatarId;
    }
    return result;
  }

  public get id(): string {
    return this._id;
  }

  public set id(value: string) {
    this._id = value;
  }

  public get username(): string {
    return this._username;
  }

  public set username(value: string) {
    this._username = value;
  }

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  public get surname(): string {
    return this._surname;
  }

  public set surname(value: string) {
    this._surname = value;
  }

  public get email(): string {
    return this._email;
  }

  public set email(value: string) {
    this._email = value;
  }

  public get avatarId(): number {
    return this._avatarId;
  }

  public set avatarId(value: number) {
    this._avatarId = value;
  }

  public get avatar(): Avatar {
    return this._avatar;
  }

  public set avatar(value: Avatar) {
    this._avatar = value;
  }

}
