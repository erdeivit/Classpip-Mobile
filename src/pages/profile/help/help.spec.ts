import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../../test';
import { HelpPage } from './help';

let fixture: ComponentFixture<HelpPage> = null;
/* tslint:disable */
let instance: any = null;
/* tslint:enable */

describe('Pages: HelpPage', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([HelpPage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  it('should create the HelpPage', async(() => {
    expect(instance).toBeTruthy();
  }));
});
