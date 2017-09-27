import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import {LoginServiceProvider} from '../../providers/login-service/login-service';

import { Login } from '../../clases/login';

@IonicPage()
@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class UsuarioPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private servicio:LoginServiceProvider, public alertCtrl:AlertController

  ) {}

  private rSala:string;
  private login:any;

  ionViewDidLoad() {
    this.rSala = 'PPS-4A';
    this.login = this.navParams.data;
  }

  private entrarChat():void{
    if(this.rSala == "PPS-4A" || this.rSala == "PPS-4B"){
        this.navCtrl.push('ChatPage', {'sala':this.rSala,
                                       'nombre':this.login.nombre,
                                       'perfil':this.login.perfil
                                      }
        );
    }else{
      let alert = this.alertCtrl.create({
        subTitle: 'Seleccione una sala',
        buttons: ['OK']
      });
      alert.present();
    }

  }


  deslogear(){
    this.servicio.logOut();
    this.navCtrl.goToRoot({});
  }

}
