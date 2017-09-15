import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Login } from '../../clases/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private usuario: Login;
  private nombre: string;
  private passw: number;
  private errCred: boolean;

  constructor(public navCtrl: NavController, public platform:Platform) {
    this.nombre = "";
    this.passw = null;
    this.errCred = false;
    this.passw = null;
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

  private writePassw():void{
    switch (this.nombre) {
      case "admin":
        this.passw = 11;
        this.errCred = false;
      break;
      case "invitado":
        this.passw = 22;
        this.errCred = false;
      break;
      case "usuario":
        this.passw = 33;
        this.errCred = false;
      break;
      case "j1":
        this.passw = 44;
        this.errCred = false;
      break;
      case "j2":
        this.passw = 55;
        this.errCred = false;
      break;

      default:
      break;
    }
  }

  private salir():void{

    this.platform.exitApp();
  }


}
