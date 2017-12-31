import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AlertType } from '../../entities/alerttype';

import { LocalInformationProvider } from '../../providers/local/information/information';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { UpdateAlertTypePage } from '../update-alerttype/update-alerttype';
import { AllAlertTypesPage } from '../all-alerttypes/all-alerttypes';

@Component({
  selector: 'page-overview-alerttype',
  templateUrl: 'overview-alerttype.html',
})
export class OverviewAlertTypePage {

  public alertType: AlertType;

  constructor(public navCtrl: NavController, public navParams: NavParams, public localInformationProvider: LocalInformationProvider) {
    this.alertType = this.navParams.get("alertType");
  }

  public ionViewWillEnter(): void {
    if (!this.localInformationProvider.isUserAdministrator()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllAlertTypesPage });
    } else {
      this.alertType = this.navParams.get("alertType");
    }
  }

  public onUpdateAlertTypeButtonClicked(): void {
    this.navCtrl.push(UpdateAlertTypePage, { alertType: this.alertType });
  }
}