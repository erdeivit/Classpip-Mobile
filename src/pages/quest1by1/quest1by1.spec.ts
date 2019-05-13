import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { quest1by1Page } from './quest1by1';

let fixture: ComponentFixture<quest1by1Page> = null;
/* tslint:disable */
let instance: any = null;
/* tslint:enable */

describe('Pages: quest1by1Page', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([quest1by1Page]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  it('should create the quest1by1Page', async(() => {
    expect(instance).toBeTruthy();
  }));
});
