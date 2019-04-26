
export class Question {

  private _statement: string;
  private _id: string;
  private _answer1: string;
  private _answer2: string;
  private _answer3: string;
  private _answer4: string;
  private _answer5: string;
  private _answer6: string;
  private _correctanswer: string;
  private _image: string;
  private _difficulty: string;
  private _category: string;
  private _explanation: string;
  private _teacherId: string;
  private _questionnaireId: string;

  // tslint:disable-next-line: max-line-length
  constructor(id?: string, statement?: string, answer1?: string, answer2?: string, answer3?: string, answer4?: string, answer5?: string, answer6?: string, correctanswer?: string, image?: string, difficulty?: string, category?: string,
    explanation?: string, teacherId?: string, questionnaireId?: string) {
    this._id = id;
    this._statement = statement;
    this._answer1 = answer1;
    this._answer1 = answer2;
    this._answer1 = answer3;
    this._answer1 = answer4;
    this._answer1 = answer5;
    this._answer1 = answer6;
    this._correctanswer = correctanswer;
    this._image = image;
    this._difficulty = difficulty;
    this._category = category;
    this._explanation = explanation;
    this._teacherId = teacherId;
    this._questionnaireId = questionnaireId;
  }

  /* tslint:disable */
  static toObject(object: any): Question {
    /* tslint:enable */
    let result: Question = new Question();
    if (object != null) {
      result.id = object.id;
      result.statement = object.statement;
      result.answer1 = object.answer1;
      result.answer2 = object.answer2;
      result.answer3 = object.answer3;
      result.answer4 = object.answer4;
      result.answer5 = object.answer5;
      result.answer6 = object.answer6;
      result.correctanswer = object.correctanswer;
      result.image = object.image;
      result.difficulty = object.difficulty;
      result.category = object.category;
      result.explanation = object.explanation;
      result.questionnaireId = object.questionnaireId;
      result.teacherId = object.teacherId;

    }
    return result;
  }

  /* tslint:disable */
  static toObjectArray(object: any): Array<Question> {
    /* tslint:enable */
    let resultArray: Array<Question> = new Array<Question>();
    if (object != null) {
      for (let i = 0; i < object.length; i++) {
        resultArray.push(Question.toObject(object[i]));
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

  public get statement(): string {
    return this._statement;
  }

  public set statement(value: string) {
    this._statement = value;
  }

  public get answer1(): (string) {
    return this._answer1;
  }

  public set answer1(value: string) {
    this._answer1 = value;
  }
  public get answer2(): (string) {
    return this._answer2;
  }

  public set answer2(value: string) {
    this._answer2 = value;
  }
  public get answer3(): (string) {
    return this._answer3;
  }

  public set answer3(value: string) {
    this._answer3 = value;
  }
  public get answer4(): (string) {
    return this._answer4;
  }

  public set answer4(value: string) {
    this._answer4 = value;
  }
  public get answer5(): (string) {
    return this._answer5;
  }

  public set answer5(value: string) {
    this._answer5 = value;
  }
  public get answer6(): (string) {
    return this._answer6;
  }

  public set answer6(value: string) {
    this._answer6 = value;
  }
  public get correctanswer(): (string) {
    return this._correctanswer;
  }

  public set correctanswer(value: string) {
    this._correctanswer = value;
  }

  public get image(): string {
    return this._image;
  }

  public set image(value: string) {
    this._image = value;
  }
  public get difficulty(): string {
    return this._difficulty;
  }

  public set difficulty(value: string) {
    this._difficulty = value;
  }
  public get category(): string {
    return this._category;
  }

  public set category(value: string) {
    this._category = value;
  }
  public get explanation(): string {
    return this._explanation;
  }

  public set explanation(value: string) {
    this._explanation = value;
  }
  public get questionnaireId(): string {
    return this._questionnaireId;
  }

  public set questionnaireId(value: string) {
    this._questionnaireId = value;
  }
  public get teacherId(): string {
    return this._teacherId;
  }

  public set teacherId(value: string) {
    this._teacherId = value;
  }
}
