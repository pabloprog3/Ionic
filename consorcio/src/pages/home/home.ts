import { Component } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/login-service/login-service';

import { Login } from '../../clases/login';
import { Usuario } from '../../clases/usuario';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private nombre: string;
  private passw: number;
  private loginUser: Login;
  private errCred: boolean;
  private usuarios:any;
  private usuario:Login;

  constructor(public navCtrl: NavController, public platform: Platform,
              private auth:LoginServiceProvider, public alertCtrl:AlertController

  ) {}

  private loginAdmin():void{
      this.nombre = 'admin@admin.com';
      this.passw = 111111;
  }

  private loginUsuarioo():void{
    this.nombre = 'usuario@usuario.com';
    this.passw = 222222;
  }

  private loginInvitado():void{
    this.nombre = 'invitado@invitado.com';
    this.passw = 333333;
  }

  private loginJ1():void{
    this.nombre = 'jugador1@jugador.com';
    this.passw = 444444;
  }

  private loginJ2():void{
    this.nombre = 'jugador2@jugador.com';
    this.passw = 555555;
  }

  ionViewDidLoad(){
    this.nombre = "";
    this.passw = null;
    this.errCred = false;
    this.passw = null;

    this.auth.getPerfilLogin().subscribe(usuarios=>this.usuarios = usuarios);
    this.loginUser = new Login();
   }

   login():void{
    this.loginUser.setNombre(this.nombre);
    this.loginUser.setClave(this.passw);

    this.auth.loginUser(this.loginUser.getNombre(), this.passw.toString());

    this.usuarios.forEach(usuario => {
      if (usuario['correo'] == this.loginUser.getNombre()) {
        this.loginUser.setPerfil(usuario['perfil']);
      }
    });
    if(this.loginUser.getPerfil() == ""){
      let msjAlert = this.alertCtrl.create({
        title: '¡Usuario inválido!',
        subTitle: 'Los datos ingresados no corresponden a un usuario registrado',
        buttons: ['Aceptar']
      });
      msjAlert.present();
    }else{
      this.navCtrl.push('VotoPage', {'nombre':this.loginUser.getNombre(), 'perfil':this.loginUser.getPerfil()});
    }

  }




  private salir():void{
    this.platform.exitApp();
  }



}
