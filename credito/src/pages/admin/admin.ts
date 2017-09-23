import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Login } from '../../clases/login'
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

  }

  deslogear(){
    this.servicio.logOut();
    this.navCtrl.goToRoot({});
  }

}
