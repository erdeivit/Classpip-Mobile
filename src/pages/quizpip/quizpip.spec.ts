import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { QuizPipPage } from './quizpip';

let fixture: ComponentFixture<QuizPipPage> = null;
/* tslint:disable */
let instance: any = null;
/* tslint:enable */

describe('Pages: QuizPipPage', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([QuizPipPage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  it('should create the QuizPipPage', async(() => {
    expect(instance).toBeTruthy();
  }));
});
