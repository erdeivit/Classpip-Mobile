import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { ProfilePage } from './profile';

let fixture: ComponentFixture<ProfilePage> = null;
/* tslint:disable */
let instance: any = null;
/* tslint:enable */

describe('Pages: ProfilePage', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([ProfilePage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  it('should create the ProfilePage', async(() => {
    expect(instance).toBeTruthy();
  }));
});
