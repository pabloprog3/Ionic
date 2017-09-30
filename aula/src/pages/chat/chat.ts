import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Mensaje } from '../../clases/mensaje';
import { UsuarioServiceProvider } from '../../providers/usuario-service/usuario-service';

import { FirebaseListObservable } from 'angularfire2/database';


@IonicPage()

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})

export class ChatPage {
  nombreUser:string;
  perfilUser:string;

  mostrarSpinner:boolean;

  private nombreSala:string;
  private MAX_MENSAJE:number;
  private tecla:any;
  private mensaje:string;
  private mensajes:any[];




  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl:AlertController, private servicio:UsuarioServiceProvider

  ) {}

  ionViewWillEnter(){
    this.mostrarSpinner = true;
  }

  ionViewDidEnter(){
   this.mostrarSpinner = false;
  }

  ionViewDidLoad() {

    this.nombreSala = this.navParams.get('sala');
    this.nombreUser = this.navParams.get('nombre');
    this.perfilUser = this.navParams.get('perfil');

    this.MAX_MENSAJE = 66;
    this.mensaje = "";

   this.servicio.getMensajesLista(this.nombreSala).subscribe(mensajes=>this.mensajes=mensajes, err=>console.log(err));

  }

  changeMsj(keypress:KeyboardEvent):void{
    //console.log(keypress.charCode);
    //console.log('evento keypress: ', keypress);
    if (this.MAX_MENSAJE == 0) {
      //keypress.preventDefault();
      keypress.preventDefault();
    }
  }

  evKeyDown(keydown:KeyboardEvent):void{
   if (keydown.repeat) {
     //evitar que mantenga apretada una misma tecla
     //keydown.preventDefault();
     keydown.preventDefault();
   }
  }

  backspace(keyup:KeyboardEvent){
    //console.log('evento keyup: ', keyup);
    //console.log('code: ', keyup.code);
    if (keyup.keyCode == 8) {
      //presiono tecla backspace
      if (this.MAX_MENSAJE <= 65) {
        this.MAX_MENSAJE += 1;
      }else{
        if (this.MAX_MENSAJE == 0) {
          //keyup.preventDefault();
          keyup.preventDefault();
        }
      }
    } else{
      if (this.MAX_MENSAJE > 0 && this.MAX_MENSAJE <= 66 ) {
          this.MAX_MENSAJE -= 1;
      }
    }
  }

  guardarMSJ(){
    if (this.mensaje == "") {
      let msjAlert = this.alertCtrl.create({
        title: '¡Mensaje vacío!',
        subTitle: 'No se puede enviar mensajes sin contenido',
        buttons: ['Aceptar']
      });
      msjAlert.present();
    } else {
      let mensaje = new Mensaje();
          mensaje.setAula(this.nombreSala);
          mensaje.setNombre(this.nombreUser);
          mensaje.setMensaje(this.mensaje);

      this.servicio.guardarMensaje(mensaje);
      this.mensaje = "";

    }

  }


  private limpiarMSJ():void{
    this.mensaje = "";
    this.MAX_MENSAJE = 66;
  }

  private volver():void{
    if(this.navCtrl.canGoBack()){
      this.navCtrl.popTo('HomePage');
    }
  }

}
