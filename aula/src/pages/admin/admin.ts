import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import { LoginServiceProvider } from '../../providers/login-service/login-service';


@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private servicio:LoginServiceProvider

  ) {}

  ionViewDidLoad() {
    //console.log('ionViewDidLoad AdminPage');
  }

  deslogear(){
    this.servicio.logOut();
    this.navCtrl.goToRoot({});
  }

}
