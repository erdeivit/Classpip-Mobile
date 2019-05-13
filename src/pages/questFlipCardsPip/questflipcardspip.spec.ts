import { ComponentFixture, async } from './node_modules/@angular/core/testingar/core/testingar/core/testing';
import { TestUtils } from '../../test';
import { questflipcardspip } from './questflipcardspip';

let fixture: ComponentFixture<questflipcardspip> = null;
/* tslint:disable */
let instance: any = null;
/* tslint:enable */

describe('Pages: questflipcardspip', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([questflipcardspip]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  it('should create the questflipcardspip', async(() => {
    expect(instance).toBeTruthy();
  }));
});
