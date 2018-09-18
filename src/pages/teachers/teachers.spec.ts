import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { TeachersPage } from './teachers';

let fixture: ComponentFixture<TeachersPage> = null;
/* tslint:disable */
let instance: any = null;
/* tslint:enable */

describe('Pages: TeachersPage', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([TeachersPage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  it('should create the TeachersPage', async(() => {
    expect(instance).toBeTruthy();
  }));
});
