import { Component, OnInit } from '@angular/core';
import {AlertController, NavController, Platform, LoadingController} from 'ionic-angular';

import { UsuarioServiceProvider } from '../../providers/usuario-service/usuario-service';
import {Usuario} from '../../clases/usuario';


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
  private usuario:Usuario;


  constructor(public alertCtrl:AlertController, private servicio:UsuarioServiceProvider,
              public navCtrl:NavController, public loadingCtrl:LoadingController

  ) {}

  ngOnInit(){
    this.usuario = new Usuario();
  }

  private confirmPassw():void{
      if (this.passw1 != null && this.passw1 != "") {
        this.enPassw = false;
      } else {
        this.enPassw = true;
        if (this.passw1 == "") {
          this.passw2 = null;
        }

      }
  }

  private textoInf():void{
    if(this.passw1 != "" && this.passw2 != ""){
      this.mostrarTextoInf = true;
      if(this.passw1 != this.passw2){
        this.OkError="danger";
        this.textoOkError="Las claves no coinciden";
        this.iconOkErr = "close";
      }else{
        this.OkError="secondary";
        this.textoOkError="Las claves coinciden";
        this.iconOkErr = "checkmark";
        this.enableConfirmUser = false;
      }
    }else{
      this.mostrarTextoInf = false;
    }

  }

  private registrarseFirebase():void{

    if (this.usuario != null && this.usuario != undefined) {
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
      this.usuario.setClave(this.passw1);
      this.usuario.setNombre(this.nombre);
      this.usuario.setCorreo(this.correo);
      this.usuario.setPerfil(this.rPerfil);
      this.usuario.setSexo(this.rSexo);
      //console.log('usuario: ', this.usuario);
      this.servicio.guardarUsuario(this.usuario);

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
    if (this.nombre == "") {
      let alert = this.alertCtrl.create({
        title: '¡Faltan Datos!',
        inputs: [
          {
            name: 'nombre',
            placeholder: 'Nombre de usuario'
          }
        ],
        buttons: [
          {
            text: 'Confirmar',
            handler: data =>{
              if (data != "") {
                this.nombre = data['nombre'];
              }
            }
          }
        ]
      }); //fin config alerta
      alert.present();
    }

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

    if (this.correo == "") {
      let alert = this.alertCtrl.create({
        title: '¡Faltan Datos!',
        inputs: [
          {
            name: 'correo',
            placeholder: 'Correo'
          }
        ],
        buttons: [
          {
            text: 'Confirmar',
            handler: data =>{
              if (data != "") {
                this.correo = data['correo'];
              }
            }
          }
        ]
      });
      alert.present();
    }
  }

}//fin clase
