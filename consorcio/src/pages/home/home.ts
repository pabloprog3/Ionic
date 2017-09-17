import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { Login } from '../../clases/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private nombre: string;
  private passw: number;
  private usuario: Login;
  private errCred: boolean;

  constructor(public navCtrl: NavController, public platform: Platform) {
      this.nombre = "";
      this.passw = null;
      this.errCred = false;
  }

  private loginAdmin():void{
      this.nombre = 'Admin';
      this.passw = 11;
  }

  private loginUsuario():void{
    this.nombre = 'Usuario';
    this.passw = 22;
  }

  private loginInvitado():void{
    this.nombre = 'Invitado';
    this.passw = 33;
  }

  private loginJ1():void{
    this.nombre = 'Jugador 1';
    this.passw = 44;
  }

  private loginJ2():void{
    this.nombre = 'Jugador 2';
    this.passw = 55;
  }

  private login():void{
    this.usuario = new Login();
    this.usuario.setNombre(this.nombre);
    this.usuario.setClave(this.passw);
    //console.log('usuario: ', this.usuario);
    if (this.usuario.getNombre() == "" || this.usuario.getClave() == null) {
      this.errCred = true;
    }else{
      this.errCred = false;
      this.navCtrl.push("AdminPage");
    }
  }

  private salir():void{
    this.platform.exitApp();
  }
    

}
