import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { RoleSelectPage } from './role-select';

let fixture: ComponentFixture<RoleSelectPage> = null;
/* tslint:disable */
let instance: any = null;
/* tslint:enable */

describe('Pages: RoleSelectPage', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([RoleSelectPage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  it('should create the RoleSelectPage', async(() => {
    expect(instance).toBeTruthy();
  }));
});
