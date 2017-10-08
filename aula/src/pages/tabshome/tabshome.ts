import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { ChataulasPage } from "../chataulas/chataulas";
import { ListauserPage } from "../listauser/listauser";
import { RegistrouserPage } from "../registrouser/registrouser";

import { Usuario } from "../../clases/usuario";
import {UsuarioServiceProvider} from '../../providers/usuario-service/usuario-service';
import {Mensaje} from '../../clases/mensaje';

@IonicPage()
@Component({
  selector: 'page-tabshome',
  templateUrl: 'tabshome.html'
})
export class TabshomePage {

  chataulasRoot = 'ChataulasPage'
  listauserRoot = 'ListauserPage'
  registrouserRoot = 'RegistrouserPage'
  usuario:Usuario;
  mensajes: Mensaje[];


  constructor(public navCtrl: NavController, public navParams:NavParams,
              private servicioDB:UsuarioServiceProvider, public alertCtrl:AlertController
  )
  {
    this.usuario = new Usuario();
    this.usuario = this.navParams.data;
    console.log('constructor tabshome', this.navParams.data);

  }

  ionViewDidLoad() {


  }

  tabChat(evento:Event){
    console.log('data usuario:', this.usuario);
    console.log('navParamm', this.navParams.data);
    console.log('usuario tabshome', this.usuario);
    this.navCtrl.push('ChataulasPage', this.usuario);
  }

}
