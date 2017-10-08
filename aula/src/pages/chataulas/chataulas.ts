import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import {LoginServiceProvider} from '../../providers/login-service/login-service';
import { UsuarioServiceProvider } from "../../providers/usuario-service/usuario-service";

import { Login } from '../../clases/login';
import {Mensaje} from '../../clases/mensaje';

@IonicPage()
@Component({
  selector: 'page-chataulas',
  templateUrl: 'chataulas.html',
})
export class ChataulasPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl:AlertController, private servicio:LoginServiceProvider,
              private servicioDB:UsuarioServiceProvider
  ) {}

  private rSala:string;
  private login:any;
  private mensajes: Mensaje[];

  ionViewDidLoad() {
    this.rSala = 'PPS-4A';
    this.login = this.navParams.data;

    console.log('navParam chataulas', this.navParams.data);
    console.log('msj', this.mensajes);
    //this.servicioDB.getMensajesLista(this.rSala).subscribe(mensajes => this.mensajes=mensajes),
    //err => console.log('err', err));
  }

  private entrarChat():void{
    this.servicioDB.getMensajesLista(this.rSala).subscribe(mensajes => this.mensajes=mensajes),
    (err => console.log('err', err));
    if(this.rSala == "PPS-4A" || this.rSala == "PPS-4B"){
        this.navCtrl.push('ChatPage', {'sala':this.rSala,
                                       'nombre':this.login.nombre,
                                       'perfil':this.login.perfil,
                                       'mensajes': this.mensajes
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


/*
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


*/
