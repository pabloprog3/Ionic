import { Component } from '@angular/core';
import { NavController, Platform, AlertController, LoadingController } from 'ionic-angular';
import { Login } from '../../clases/login';
import { Usuario } from '../../clases/usuario';
//import { Firebase } from '@ionic-native/firebase';

import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { FirebaseListObservable } from "angularfire2/database";
import * as firebase from "firebase";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private loginUsuario: Usuario;
  private uid:string;
  private correo: string;
  private passw: string;
  private errCred: boolean;
  private registrar: boolean = false;
  private mostrarCardRegistro: boolean = true;
  private usuarios: any[];
  private listaUsuarios:FirebaseListObservable<Usuario[]>;

  constructor(public navCtrl: NavController, public platform:Platform,
    public alertCtrl: AlertController, public auth:LoginServiceProvider,
    public loadingCtrl:LoadingController

  ) {
      this.loginUsuario = new Usuario();
   }

   ionViewDidLoad(){
    this.correo = "";
    this.passw = null;
    this.errCred = false;
    this.passw = null;

    //this.auth.getPerfilLogin().subscribe(usuarios=>this.usuarios = usuarios);

   }

   login(){

    //this.navCtrl.push('ScannerPage');
    /*
      const loading = this.loadingCtrl.create({
      content: 'Verificando datos. Espere...',
      dismissOnPageChange: true
    });
    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 10000);*/


    this.loginUsuario.setCorreo(this.correo);
    this.loginUsuario.setClave(this.passw);
    let msj = this.alertCtrl.create({
      subTitle: 'entrandooo;  ' + this.loginUsuario.getCorreo() + '; ' + this.loginUsuario.getClave(),
      buttons: ['ok']
    });
    msj.present();

      this.auth.loginUser(this.loginUsuario.getCorreo(), this.loginUsuario.getClave())
        .then(user => {
           //autenticado
            this.navCtrl.push('ScannerPage', {'uid':this.auth.getUserUID()});
        })//termina then

  }

  private writePassw():void{
    if(this.correo == ""){
      this.mostrarCardRegistro = true;
      this.passw = "";
    }
    switch (this.correo) {
      case "admin@admin.com":
        this.passw = '111111';
        this.errCred = false;
        this.registrar= false;
        this.mostrarCardRegistro = false;
      break;
      case "invitado@invitado.com":
        this.passw = '222222';
        this.errCred = false;
        this.registrar= false;
        this.mostrarCardRegistro = false;

      break;
      case "usuario@usuario.com":
        this.passw = '333333';
        this.errCred = false;
        this.registrar= false;
        this.mostrarCardRegistro = false;

      break;
      case "jugador1@jugador.com":
        this.passw = '444444';
        this.errCred = false;
        this.registrar= false;
        this.mostrarCardRegistro = false;

      break;
      case "jugador2@jugador.com":
        this.passw = '555555';
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

    let clave:string = this.passw;
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
