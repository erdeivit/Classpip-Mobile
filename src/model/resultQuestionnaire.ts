import { QuestionnaireGame } from './questionnaireGame';
import { Student } from './student';
import { Teacher } from './teacher';

export class resultQuestionnaire {
  private _questionnaireGame: QuestionnaireGame;
  private _numAnswersCorrect: string;
  private _numAnswersNoCorrect: string;
  private _finalNote: string;
  private _dataAnswers: Array<string>;
  private _studentId: string;
  constructor(questionnaireGame?: QuestionnaireGame,  studentId?: string, numAnswersCorrect?: string, numAnswersNoCorrect?: string, finalNote?: string,dataAnswers?: Array<string>) {
    this._questionnaireGame = questionnaireGame;
    this._numAnswersCorrect = numAnswersCorrect;
    this._numAnswersNoCorrect = numAnswersNoCorrect;
    this._finalNote = finalNote;
    this._dataAnswers = dataAnswers;
    this._studentId = studentId;
  }

  /* tslint:disable */
  static toObject(object: any): resultQuestionnaire {
    /* tslint:enable */
    let result: resultQuestionnaire = new resultQuestionnaire();
    if (object != null) {
      result.questionnaireGame = object.questionnaireGame;
      result.numAnswersCorrect = object.numAnswersCorrect;
      result.numAnswersNoCorrect = object.numAnswersNoCorrect;
      result.finalNote = object.finalNote;
      result.dataAnswers = object.dataAnswers;
      result.studentId = object.studentId;
    }
    return result;
  }
 /* tslint:disable */
  static toObjectArray(object: any): Array<resultQuestionnaire> {
    let resultArray: Array<resultQuestionnaire> = new Array<resultQuestionnaire>();
    if (object != null) {
      for (let i = 0; i < object.length; i++) {
        resultArray.push(resultQuestionnaire.toObject(object[i]));
      }
    }
    return resultArray;
  }

  public get questionnaireGame(): QuestionnaireGame {
    return this._questionnaireGame;
  }

  public set questionnaireGame(value: QuestionnaireGame) {
    this._questionnaireGame = value;
  }

  public get numAnswersCorrect(): string {
    return this._numAnswersCorrect;
  }

  public set numAnswersCorrect(value: string) {
    this._numAnswersCorrect = value;
  }

  public get numAnswersNoCorrect(): string {
    return this._numAnswersNoCorrect;
  }

  public set numAnswersNoCorrect(value: string) {
    this._numAnswersNoCorrect = value;
  }

  public get finalNote(): string {
    return this._finalNote;
  }

  public set finalNote(value: string) {
    this._finalNote = value;
  }

  public get dataAnswers(): Array<string> {
    return this._dataAnswers;
  }

  public set dataAnswers(value: Array<string>) {
    this._dataAnswers = value;
  }
  public get studentId(): string {
    return this._studentId;
  }

  public set studentId(value: string) {
    this._studentId = value;
  }
}
