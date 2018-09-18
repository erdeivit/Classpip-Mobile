import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { StudentsPage } from './students';

let fixture: ComponentFixture<StudentsPage> = null;
/* tslint:disable */
let instance: any = null;
/* tslint:enable */

describe('Pages: StudentsPage', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([StudentsPage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  it('should create the StudentsPage', async(() => {
    expect(instance).toBeTruthy();
  }));
});
