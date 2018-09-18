import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../../test';
import { StudentPage } from './student';

let fixture: ComponentFixture<StudentPage> = null;
/* tslint:disable */
let instance: any = null;
/* tslint:enable */

describe('Pages: StudentPage', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([StudentPage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  it('should create the StudentPage', async(() => {
    expect(instance).toBeTruthy();
  }));
});
