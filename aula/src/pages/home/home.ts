import { Component } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';
import { Login } from '../../clases/login';
import { Firebase } from '@ionic-native/firebase';

import { InicioSesionComponent } from '../../components/inicio-sesion/inicio-sesion';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private usuario: Login;
  private nombre: string;
  private passw: any;
  private errCred: boolean;
  private registrar: boolean = false;
  private mostrarCardRegistro: boolean = true;

  constructor(public navCtrl: NavController, public platform:Platform,
    public alertCtrl: AlertController

  ) {
      this.nombre = "";
      this.passw = null;
      this.errCred = false;
      this.passw = null;
   }

  private login():void{
    this.usuario = new Login();
    this.usuario.setNombre(this.nombre);
    this.usuario.setClave(this.passw);





/*

    if (this.usuario.getNombre() == "" || this.usuario.getClave() == null) {
      this.errCred = true;
    }else{
      this.errCred = false;
      this.navCtrl.push("AdminPage");
    }
*/
  }

  private writePassw():void{
    if(this.nombre == ""){
      this.mostrarCardRegistro = true;
      this.passw = "";
    }
    switch (this.nombre) {
      case "admin":
        this.passw = 11;
        this.errCred = false;
        this.registrar= false;
        this.mostrarCardRegistro = false;
      break;
      case "invitado":
        this.passw = 22;
        this.errCred = false;
        this.registrar= false;
        this.mostrarCardRegistro = false;

      break;
      case "usuario":
        this.passw = 33;
        this.errCred = false;
        this.registrar= false;
        this.mostrarCardRegistro = false;

      break;
      case "j1":
        this.passw = 44;
        this.errCred = false;
        this.registrar= false;
        this.mostrarCardRegistro = false;

      break;
      case "j2":
        this.passw = 55;
        this.errCred = false;
        this.registrar= false;
        this.mostrarCardRegistro = false;

      break;

      default:
      break;
    }
  }

  private validarNum(tecla:KeyboardEvent):void{
    if (tecla.charCode >= 48 && tecla.charCode <= 57) {
      return;
    }else{
      tecla.preventDefault();
      let msjAlert = this.alertCtrl.create({
        title: '¡Carácter inválido!',
        subTitle: 'La password debe ser numérica y tener hasta 6 dígitos',
        buttons: ['Aceptar']
      });

      msjAlert.present();
    }
  }

  private validarCantDigitos(event:Event):void{

    let clave:Number = this.passw;
    if (clave.toString().length > 6) {
      let msjAlert = this.alertCtrl.create({
        title: '¡Alcanzó el Maximo!',
        subTitle: 'Ingrese una clave de no más de 6 carácteres',
        buttons: ['Aceptar']
      });
      msjAlert.present();
      this.passw = "";
    }
  }

  private mostrarRegistro():void{
    this.registrar = true;
  }

  private salir():void{

    this.platform.exitApp();
  }


}
