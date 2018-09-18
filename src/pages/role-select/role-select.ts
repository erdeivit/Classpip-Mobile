import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { UtilsService } from '../../providers/utils.service';
import { Page } from '../../model/page';
import { Role } from '../../model/role';
import { LoginPage } from '../../pages/login/login';

@Component({
  selector: 'page-role-select',
  templateUrl: './role-select.html'
})
export class RoleSelectPage {

  public role = Role;
  public loginPage: Page = new Page(LoginPage);

  constructor(
    public menuController: MenuController,
    public navController: NavController,
    public translateService: TranslateService,
    public utilsService: UtilsService) {

    this.menuController.enable(false);
  }

  /**
   * This method is used for navigate between pages. The page
   * to go is passed by parameter
   * @param {Page} page Page to display
   */
  public openPage(page: Page, role: Role): void {
    this.utilsService.role = role;
    this.navController.push(page.component);
  }

}
