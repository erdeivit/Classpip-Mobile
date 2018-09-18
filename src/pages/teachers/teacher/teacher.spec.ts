import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../../test';
import { TeacherPage } from './teacher';

let fixture: ComponentFixture<TeacherPage> = null;
/* tslint:disable */
let instance: any = null;
/* tslint:enable */

describe('Pages: TeacherPage', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([TeacherPage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  it('should create the TeacherPage', async(() => {
    expect(instance).toBeTruthy();
  }));
});
