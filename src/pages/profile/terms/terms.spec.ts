import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../../test';
import { TermsPage } from './terms';

let fixture: ComponentFixture<TermsPage> = null;
/* tslint:disable */
let instance: any = null;
/* tslint:enable */

describe('Pages: TermsPage', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([TermsPage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  it('should create the TermsPage', async(() => {
    expect(instance).toBeTruthy();
  }));
});
