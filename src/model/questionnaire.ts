import { Question } from './question';

export class Questionnaire {

  private _id: string;
  private _name: string;
  private _description: string;
  private _image: string;
  private _question: Question[];
  private _teacherId: string;

  constructor(id?: string, name?: string, description?: string, image?: string, teacherId?: string) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._image = image;
    this._teacherId = teacherId;
  }

  /* tslint:disable */
  static toObject(object: any): Questionnaire {
    /* tslint:enable */
    let result: Questionnaire = new Questionnaire();
    if (object != null) {
      result.id = object.id;
      result.name = object.name;
      result.description = object.description; // el campo object.DESCRIPTION tiene que ser el mismo que en  la BBDD
      result.image = object.image;
      result.question = object.questionId;
      result.teacherId = object.teacherId;
    }
    return result;
  }

  /* tslint:disable */
  static toObjectArray(object: any): Array<Questionnaire> {
    /* tslint:enable */
    let resultArray: Array<Questionnaire> = new Array<Questionnaire>();
    if (object != null) {
      for (let i = 0; i < object.length; i++) {
        resultArray.push(Questionnaire.toObject(object[i]));
      }
    }
    return resultArray;
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
  public get description(): string {
    return this._description;
  }

  public set description(value: string) {
    this._description = value;
  }
  public get image(): string {
    return this._image;
  }

  public set image(value: string) {
    this._image = value;
  }
  public get question(): Question[] {
    return this._question;
  }
  public set question(value: Question[]) {
    this._question = value;
  }
  public get teacherId(): string {
    return this._teacherId;
  }
  public set teacherId(value: string) {
    this._teacherId = value;
  }
}
