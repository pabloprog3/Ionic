import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, LoadingController } from 'ionic-angular';

import { LoginServiceProvider } from '../../providers/login-service/login-service';

import { Login } from '../../clases/login';



@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  private enableUsuario: boolean;
  private enableChat:boolean;
  private enableLista:boolean;

  private enableBtnChat:boolean;
  private enableBtnLista:boolean;
  private enableBtnUsuario:boolean;

  private msjNuevoUsuario: string;
  private msjChat:string;
  private msjLista:string;

  private rSala:string;
  private login:any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              private servicio:LoginServiceProvider, public alertCtrl:AlertController,
              public loadingCtrl:LoadingController

  ) {}

  ionViewDidLoad() {

    this.rSala = 'PPS-4A';
    this.login = this.navParams.data;

    this.enableUsuario = false;
    this.enableChat = false;
    this.enableLista = false;

    this.enableBtnChat = false;
    this.enableBtnLista = false;
    this.enableBtnUsuario = false;

    this.msjNuevoUsuario = "Nuevo Usuario";
    this.msjChat = "Ir al Chat";
    this.msjLista = "Listado de Usuarios";
  }

  private enableNuevoUsuario():void{
    if (this.enableUsuario) {
      this.enableUsuario = false;
      this.msjNuevoUsuario = "Nuevo Usuario";
      this.enableBtnChat = false;
      this.enableBtnLista = false;
    }else{
      this.enableUsuario = true;
      this.msjNuevoUsuario = "Cancelar Registro";
      this.enableBtnChat = true;
      this.enableBtnLista = true;
    }
  }

  private elegirChat():void{
    if (this.enableChat) {
      this.enableChat = false;
      this.msjChat = "Ir al Chat";
      this.enableBtnLista = false;
      this.enableBtnUsuario = false;
    } else {
      this.enableChat = true;
      this.msjChat = "Cerrar Chats";
      this.enableBtnLista = true;
      this.enableBtnUsuario = true;
    }
  }

  private elegirLista():void{
    if (this.enableLista) {
      this.enableLista = false;
      this.msjLista = "Listado de Usuarios";
      this.enableBtnChat = false;
      this.enableBtnUsuario = false;
    } else {
      this.enableLista = true;
      this.msjLista = "Cerrar Listado";
      this.enableBtnChat = true;
      this.enableBtnUsuario = true;
    }
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
