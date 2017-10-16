import { Component } from '@angular/core';
import { NavController, Platform, AlertController, LoadingController } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Login } from '../../clases/login';
import { Usuario } from '../../clases/usuario';
import { VotoServiceProvider } from "../../providers/voto-service/voto-service";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private correo: string;
  private passw: number;
  private loginUsuario: Usuario;
  private errCred: boolean;
  private usuarios: any;
  private usuario: Login;
  private listaUsuarios: any = [];
  private nombre: string;

  constructor(public navCtrl: NavController, public platform: Platform,
    private auth: LoginServiceProvider, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController

  ) { }

  private loginAdmin(): void {
    this.correo = 'admin@admin.com';
    this.passw = 111111;
  }

  private loginUsuarioo(): void {
    this.correo = 'usuario@usuario.com';
    this.passw = 333333;
  }

  private loginInvitado(): void {
    this.correo = 'invitado@invitado.com';
    this.passw = 222222;
  }

  private loginJ1(): void {
    this.correo = 'jugador1@jugador.com';
    this.passw = 444444;
  }

  private loginJ2(): void {
    this.correo = 'jugador2@jugador.com';
    this.passw = 555555;
  }

  ionViewDidLoad() {
    this.correo = "";
    this.passw = null;
    this.errCred = false;
    this.passw = null;

    this.loginUsuario = new Usuario();
  }

 login(){
    this.loginUsuario.setCorreo(this.correo);
    this.loginUsuario.setClave(this.passw);

    const loading = this.loadingCtrl.create({
      content: 'Verificando datos. Espere...',
      dismissOnPageChange: true
    });
    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 15000);

    let voto:boolean;

     this.auth.loginUser(this.loginUsuario.getCorreo(), this.loginUsuario.getClave().toString())
        .then(() => {

             this.auth.getUsuariosLista().subscribe(lista=>{
              lista.forEach(usuario => {
                if (usuario['correo']==this.loginUsuario.getCorreo()) {
                  //console.log(this.db.verificarVotos(usuario['nombre']));
                  this.loginUsuario.setNombre(usuario['nombre']);
                  //voto = this.db.verificarVotos(this.loginUsuario.getNombre());
                  //console.log('voto home.ts', voto);
                }
              }); //termina foreach

              this.navCtrl.push('VotoPage', {'nombre': this.loginUsuario.getNombre()});

            });//fin subscribe
      })
  }


  private salir(): void {
    this.correo=null;
    this.passw=null;
    this.platform.exitApp();
  }



}
