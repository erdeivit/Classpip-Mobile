import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { LoginPage } from './login';

let fixture: ComponentFixture<LoginPage> = null;
/* tslint:disable */
let instance: any = null;
/* tslint:enable */

describe('Pages: LoginPage', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([LoginPage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  it('should create the LoginPage', async(() => {
    expect(instance).toBeTruthy();
  }));
});
