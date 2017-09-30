import { Component } from '@angular/core';
import { NavController, Platform, AlertController, LoadingController } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Login } from '../../clases/login';
import { Usuario } from '../../clases/usuario';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private correo: string;
  private passw: number;
  private loginUser: Usuario;
  private errCred: boolean;
  private usuarios:any;
  private usuario:Login;

  constructor(public navCtrl: NavController, public platform: Platform,
              private auth:LoginServiceProvider, public alertCtrl:AlertController,
              public loadingCtrl:LoadingController, public splash:SplashScreen

  ) {}

  private loginAdmin():void{
      this.correo = 'admin@admin.com';
      this.passw = 111111;
  }

  private loginUsuarioo():void{
    this.correo = 'usuario@usuario.com';
    this.passw = 333333;
  }

  private loginInvitado():void{
    this.correo = 'invitado@invitado.com';
    this.passw = 222222;
  }

  private loginJ1():void{
    this.correo = 'jugador1@jugador.com';
    this.passw = 444444;
  }

  private loginJ2():void{
    this.correo = 'jugador2@jugador.com';
    this.passw = 555555;
  }

  ionViewDidLoad(){
    this.correo = "";
    this.passw = null;
    this.errCred = false;
    this.passw = null;

    this.auth.getPerfilLogin().subscribe(usuarios=>this.usuarios = usuarios);
    this.loginUser = new Usuario();
   }

   login():void{
    const loading = this.loadingCtrl.create({
      content: 'Verificando datos. Espere...',
      dismissOnPageChange: true
    });
    loading.present();
    this.loginUser.setCorreo(this.correo);
    this.loginUser.setClave(this.passw);

    this.auth.loginUser(this.loginUser.getCorreo(), this.loginUser.getClave().toString());
    if(this.loginUser.getCorreo() == 'admin@admin.com')
      this.navCtrl.push('AdminPage', {'nombre':this.loginUser.getCorreo(), 'perfil':this.loginUser.getPerfil()});
    else
    this.navCtrl.push('VotoPage', {'nombre':this.loginUser.getCorreo(), 'perfil':this.loginUser.getPerfil()});
   /* this.usuarios.forEach(usuario => {
      if (usuario['correo'] == this.loginUser.getCorreo()) {
        this.loginUser.setPerfil(usuario['perfil']);
        this.loginUser.setNombre(usuario['nombre']);

      }else{
        this.loginUser.setPerfil("");
      }
    });*/

    /*if(this.loginUser.getPerfil() == ""){
      let msjAlert = this.alertCtrl.create({
        title: '¡Usuario inválido!',
        subTitle: 'Los datos ingresados no corresponden a un usuario registrado',
        buttons: ['Aceptar']
      });
      msjAlert.present();
  }*/
}




  private salir():void{
    this.platform.exitApp();
  }



}
