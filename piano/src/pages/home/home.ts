import { Component } from '@angular/core';
import { NavController, Platform, AlertController, LoadingController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen'
import { Login } from '../../clases/login';
import { Usuario } from "../../clases/usuario";
import { LoginServiceProvider } from '../../providers/login-service/login-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private usuario:Login;
  private loginUsuario: Usuario;
  private passw:number;
  private nombre: string;
  private correo:string;
  private errCred: boolean;
  private usuarios:any[];

  constructor(public navCtrl: NavController, public platform:Platform,
              private auth:LoginServiceProvider, public alertCtrl:AlertController,
              public loadingCtrl:LoadingController, public splash:SplashScreen

  ) {    this.loginUsuario = new Usuario();}


  ionViewWillEnter(){
    if (this.platform.ready()) {
      this.splash.hide();
    }else{
      this.splash.show();
    }
   }

  ionViewDidLoad(){
    this.nombre = "";
    this.passw = null;
    this.errCred = false;
    this.passw = null;
    this.correo = "";
    this.auth.getPerfilLogin().subscribe(usuarios=>this.usuarios = usuarios);

  }

  private login():void{
    const loading = this.loadingCtrl.create({
      content: 'Verificando datos. Espere...',
      dismissOnPageChange: true
    });
    loading.present();

    this.loginUsuario.setCorreo(this.correo);
    this.loginUsuario.setClave(this.passw);

    try {
      this.auth.loginUser(this.loginUsuario.getCorreo(), this.loginUsuario.getClave().toString());

          this.usuarios.forEach(usuario => {
            if (usuario['correo'] == this.loginUsuario.getCorreo()) {
              this.loginUsuario.setPerfil(usuario['perfil']);
              this.loginUsuario.setNombre(usuario['nombre']);
            }
          });

          if (this.loginUsuario.getPerfil() == "" || this.loginUsuario.getPerfil() == undefined) {
            return;
          }

         if(this.loginUsuario.getPerfil() == "admin"){
              this.navCtrl.push('SonidosPage',{ "nombre":this.loginUsuario.getNombre(), "perfil":this.loginUsuario.getPerfil()});
          }else{
            this.navCtrl.push('SonidosPage', { "nombre":this.loginUsuario.getNombre(), "perfil":this.loginUsuario.getPerfil()});
          }
    } catch (error) {
      let msjAlert = this.alertCtrl.create({
        title: '¡Usuario inválido!',
        subTitle: 'Los datos ingresados no corresponden a un usuario registrado',
        buttons: ['Aceptar']
      });
    }

  }


  private writePassw():void{
    switch (this.correo) {
      case "admin@admin.com":
        this.passw = 111111;
        this.errCred = false;
      break;
      case "invitado@invitado.com":
        this.passw = 222222;
        this.errCred = false;
      break;
      case "usuario@usuario.com":
        this.passw = 333333;
        this.errCred = false;
      break;
      case "jugador1@jugador.com":
        this.passw = 444444;
        this.errCred = false;
      break;
      case "jugador2@jugador.com":
        this.passw = 555555;
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
