import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { Alert } from '../../model/alert';
import { Cryptocurrency } from '../../model/cryptocurrency';
import { AlertType } from '../../model/alerttype';
import { AlertForm } from '../../forms/alertform';

import { RegisteredUserProvider } from '../../providers/registered/user/user';
import { RegisteredAlertTypeProvider } from '../../providers/registered/alerttype/alerttype';

import { AlertsPage } from '../alerts/alerts';

@Component({
  selector: 'page-update-alert',
  templateUrl: 'update-alert.html',
})
export class UpdateAlertPage {

  public allFavorites: Array<Cryptocurrency> = [];
  public allTypes: Array<AlertType> = [];
  public alertForm: AlertForm;
  public alertFormGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public registeredUserProvider: RegisteredUserProvider, public registeredAlertTypeProvider: RegisteredAlertTypeProvider) {
    let alert: Alert = this.navParams.get("alert");

    this.alertForm = new AlertForm();
    this.alertForm.id = alert.id;
    this.alertForm.name = alert.name;
    this.alertForm.threshold = alert.threshold;
    this.alertForm.oneShot = alert.oneShot;
    this.alertForm.active = alert.active;
    this.alertForm.userId = alert.userId;
    this.alertForm.cryptocurrencyId = alert.cryptocurrency.id;
    this.alertForm.typeId = alert.type.id;

    this.alertFormGroup = formBuilder.group({
      name: [alert.name, Validators.compose([Validators.required, Validators.maxLength(250)])],
      threshold: [alert.threshold, Validators.compose([Validators.required])],
      oneShot: [alert.oneShot],
      active: [alert.active],
      cryptocurrencyId: [alert.cryptocurrency.id, Validators.compose([Validators.required])],
      typeId: [alert.type.id, Validators.compose([Validators.required])]
    });
  }

  public ionViewDidEnter(): void {
    this.registeredUserProvider.allFavorites(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id"))).subscribe(data => {
      this.allFavorites = data.data;
      this.updateAlertName();
    });

    this.registeredAlertTypeProvider.allAlertTypes(window.localStorage.getItem("user.token.value")).subscribe(data => {
      this.allTypes = data.data;
      this.updateAlertName();
    });
  }

  public onSubmit(value: any): void {
    if (this.alertFormGroup.valid) {
      this.registeredUserProvider.updateAlert(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id")), this.alertForm).subscribe(data => {
        console.warn(data);

        this.navCtrl.setRoot(AlertsPage);
      });
    }
  }

  public updateName(): void {
    let favorite: Cryptocurrency = this.allFavorites.find(favorite => { return favorite.id === this.alertForm.cryptocurrencyId; });
    let type: AlertType = this.allTypes.find(type => { return type.id === this.alertForm.typeId; });
    let threshold: number = this.alertForm.threshold;

    this.alertForm.name = (favorite ? favorite.name : "\"Cryptocurrency\"") + " " + (type ? type.name : "\"Type\"") + " " + (threshold ? threshold : "\"Threshold\"");
  }
}