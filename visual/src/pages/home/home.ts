import { Component } from '@angular/core';
import { NavController, Platform, AlertController, LoadingController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Login } from '../../clases/login';
import { Usuario } from "../../clases/usuario";
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { ImagenServiceProvider } from "../../providers/imagen-service/imagen-service";

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
  private usuarios: any[];
  private listaUsuarios:any = [];
  private userUID:string='';

  constructor(public navCtrl: NavController, public platform:Platform,
              private auth:LoginServiceProvider, public alertCtrl:AlertController,
              public loadingCtrl:LoadingController, private servicioDB:ImagenServiceProvider
  ) {}

  ionViewWillEnter(){

   }

  ionViewDidLoad(){
    this.nombre = "";
    this.passw = null;
    this.errCred = false;
    this.passw = null;
    this.correo = "";

    this.loginUsuario = new Usuario();
  }

  private login():void{

    const loading = this.loadingCtrl.create({
      content: 'Verificando datos. Espere...',
      dismissOnPageChange: true
    });
    loading.present();
    this.loginUsuario.setCorreo(this.correo);
    this.loginUsuario.setClave(this.passw);

    this.auth.loginUser(this.loginUsuario.getCorreo(), this.loginUsuario.getClave().toString())
      .then(user=>{
        //autenticado
        this.userUID = this.auth.getAuthUID();
        this.listaUsuarios = this.servicioDB.getUsuariosLista();
        this.listaUsuarios.subscribe(lista=>{
          lista.forEach(usuario => {
            if (usuario['correo'] == this.loginUsuario.getCorreo()) {
                this.loginUsuario.setPerfil(usuario['perfil']);
                this.loginUsuario.setNombre(usuario['nombre']);
                if (this.loginUsuario.getPerfil() == 'admin') {
                  this.navCtrl.push('AdminPage', {'nombre':this.loginUsuario.getNombre(), 'uid': this.userUID});
                }else{
                  this.navCtrl.push('AdminPage', {'nombre':this.loginUsuario.getNombre(), 'uid': this.userUID});
                }
            }
          });
        });
      })
      .catch(err=>{
        let msjAlert = this.alertCtrl.create({
          subTitle: 'Error al validar usuario. Verifique sus datos',
          buttons: ['Volver']
        });
      })

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
