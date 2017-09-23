import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginServiceProvider } from '../../providers/login-service/login-service';


@IonicPage()
@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class UsuarioPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private servicio:LoginServiceProvider
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsuarioPage');
  }

  deslogear(){
    this.servicio.logOut();
    this.navCtrl.goToRoot({});
  }

}
