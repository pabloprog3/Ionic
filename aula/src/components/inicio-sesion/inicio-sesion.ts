import { Component, OnInit } from '@angular/core';
import {AlertController, NavController, Platform, LoadingController} from 'ionic-angular';

import { UsuarioServiceProvider } from '../../providers/usuario-service/usuario-service';
import {Usuario} from '../../clases/usuario';
import {Login} from '../../clases/login';

@Component({
  selector: 'inicio-sesion',
  templateUrl: 'inicio-sesion.html'
})
export class InicioSesionComponent {

  private nombre: string = "";
  private correo: string = "";
  private passw1: any;
  private passw2: any = null;
  private enPassw: boolean = true;
  private OkError: string = "";
  private textoOkError: string = "";
  private mostrarTextoInf: boolean = false;
  private iconOkErr: string = "";
  private rSexo: string = "";
  private rPerfil: string = "";
  private enableConfirmUser: boolean = true;
  private login:Login;
  private usuario:Usuario;


  constructor(public alertCtrl:AlertController, private servicio:UsuarioServiceProvider,
              public navCtrl:NavController, public loadingCtrl:LoadingController

  ) {}

  ngOnInit(){
    this.login = new Login();
    this.usuario = new Usuario();
  }

  validarSeisDigitos(){
    if (this.passw1.length < 6) {
      let msjAlert = this.alertCtrl.create({
        title: '¡Digitos insuficientes!',
        subTitle: 'La password debe tener mínimo entre 6 y 10 dígitos',
        buttons: ['Aceptar']
      });

      msjAlert.present();
      return false;
    }else{
      return true;
    }
  }

  escribirCorreo(){
    if (this.nombre != "" && this.correo != ""  && this.passw1 != "" && this.passw2 != "") {
        this.enableConfirmUser = false;
    }else{
      this.enableConfirmUser = true;
    }
}

  escribirNombre(){
      if (this.correo != "" && this.nombre != "" && this.passw1 != "" && this.passw2 != "") {
        this.enableConfirmUser = false;

      }else{
        this.enableConfirmUser = true;
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

    let clave:Number = this.passw1;

    if (clave.toString().length > 10) {
      let msjAlert = this.alertCtrl.create({
        title: '¡Alcanzó el Maximo!',
        subTitle: 'Ingrese una clave de no más de 10 dígitos',
        buttons: ['Aceptar']
      });
      msjAlert.present();
      this.passw1 = "";
    }
  }

  private confirmPassw():void{
      if (this.passw1 != "") {
        this.enPassw = false;
      } else {
        this.enPassw = true;
        if (this.passw1 == "") {
          this.enableConfirmUser = true;
          this.passw2 = "";
        }

      }
  }

  private textoInf():void{
    if (this.passw2.length < 6) {
      this.enableConfirmUser = true;
    }

    if(this.passw1 != "" && this.passw2 != ""){
      this.mostrarTextoInf = true;
      if(this.passw1 != this.passw2){
        this.OkError="danger";
        this.textoOkError="Las claves no coinciden";
        this.iconOkErr = "close";
        this.enableConfirmUser = true;
      }else{
        this.OkError="secondary";
        this.textoOkError="Las claves coinciden";
        this.iconOkErr = "checkmark";
        this.enableConfirmUser = false;
        if (this.nombre=="" || this.correo=="") {
          this.enableConfirmUser = true;
          let alert = this.alertCtrl.create({
            title: '¡Faltan Datos!',
            buttons: [
              {
                text: 'Confirmar',
              }]
        });
        alert.present();
      }
      else{
        this.mostrarTextoInf = false;
      }

    }
  }
}

  private registrarseFirebase():void{

    if (this.login != null && this.login != undefined) {
      this.configAlertas();
      const loading = this.loadingCtrl.create({
        content: 'Procesando envío de datos',
        dismissOnPageChange: true,
        duration: 4000
      });
            loading.onDidDismiss(()=>{
              let alert = this.alertCtrl.create({
                subTitle: '¡Registro Correcto!',
                buttons: [
                  {
                    text: 'Confirmar'
                  }
                ]
              });
              alert.present();
            });
      loading.present();
      this.login.setNombre(this.nombre);
      this.login.setPerfil(this.rPerfil);
      this.login.setSexo(this.rSexo);
      this.login.setCorreo(this.correo);

      this.usuario.setCorreo(this.correo);
      this.usuario.setClave(this.passw1);
      //console.log('usuario: ', this.usuario);
      this.servicio.guardarUsuario(this.login, this.usuario);

      this.cancelarRegistro();
      this.navCtrl.popToRoot();
    } else {
      let alert = this.alertCtrl.create({
        subTitle: '¡Error de usuario!',
        buttons: [
          {
            text: 'Confirmar'
          }
        ]
      });
      alert.present();
    }

  }

  private cancelarRegistro():void{
    this.nombre = "";
    this.passw1 ="";
    this.rPerfil = "";
    this.rSexo = "";
    this.correo = "";
  }

  private configAlertas():void{

    if (this.rPerfil == "") {
      let alert = this.alertCtrl.create({
        subTitle: 'Falta dato!',
        message:  'Seleccione el perfil del usuario.',
        inputs: [
          {
            name: 'rPerfil',
            label: 'Administrador',
            type: "radio",
            value: "admin",
            checked: false
          },
          {
            name: 'rPerfil',
            label: 'Usuario',
            type: "radio",
            value: "usuario",
            checked: false
          },
          {
            name: 'rPerfil',
            label: 'Invitado',
            type: "radio",
            value: "invitado",
            checked: false
          },
          {
            name: 'rPerfil',
            label: 'Jugador',
            type: "radio",
            value: "jugador",
            checked: false
          }
        ],
        buttons: [
          {
            text: 'Aceptar',
            handler: data=>this.rPerfil=data
          }
        ]

      });
      alert.present();
    }

    if (this.rSexo=="") {
      let alert = this.alertCtrl.create({
        subTitle: 'Falta dato!',
        message:  'Seleccione el perfil del usuario.',
        inputs: [
          {
            name: 'rSexo',
            label: 'Masculino',
            type: "radio",
            value: "Male",
            checked: false
          },
          {
            name: 'rSexo',
            label: 'Femenino',
            type: "radio",
            value: "Female",
            checked: false
          }
        ],
        buttons: [
          {
            text: 'Aceptar',
            handler: data=>this.rSexo=data
          }
        ]

      });
      alert.present();
    }
  }

}//fin clase
