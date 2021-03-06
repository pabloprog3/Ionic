import { Component } from '@angular/core';
import { NavController, Platform, AlertController, LoadingController} from 'ionic-angular';
import { Login } from '../../clases/login';
import { Usuario } from '../../clases/usuario';

import { Firebase } from '@ionic-native/firebase';

import { InicioSesionComponent } from '../../components/inicio-sesion/inicio-sesion';

import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { UsuarioServiceProvider } from '../../providers/usuario-service/usuario-service';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private loginUsuario: Usuario;
  private correo:string
  private nombre: string;
  private passw: any;
  private errCred: boolean;
  private registrar: boolean = false;
  private mostrarCardRegistro: boolean = true;
  private usuarios: any[];
  private listaUsuarios:any = [];

  constructor(public navCtrl: NavController, public platform:Platform,
    public alertCtrl: AlertController, private auth:LoginServiceProvider,
    public loadingCtrl: LoadingController, private servicioDB: UsuarioServiceProvider

  ) {

   }


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



   login():void{
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
        this.listaUsuarios = this.servicioDB.getUsuariosLista();
        this.listaUsuarios.subscribe(lista=>{
          lista.forEach(usuario => {
            if (usuario['correo'] == this.loginUsuario.getCorreo()) {
                this.loginUsuario.setPerfil(usuario['perfil']);
                this.loginUsuario.setNombre(usuario['nombre']);
                if (this.loginUsuario.getPerfil() == 'admin') {
                  this.navCtrl.push('AdminPage', {'nombre':this.loginUsuario.getNombre(), 'perfil':this.loginUsuario.getPerfil()});
                }else{
                  this.navCtrl.push('UsuarioPage', {'nombre':this.loginUsuario.getNombre(), 'perfil':this.loginUsuario.getPerfil()});
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
    if(this.correo == ""){
      this.mostrarCardRegistro = true;
      this.passw = "";
    }
    switch (this.correo) {
      case "admin@admin.com":
        this.passw = 111111;
        this.errCred = false;
        this.registrar= false;
        this.mostrarCardRegistro = false;
      break;
      case "invitado@invitado.com":
        this.passw = 222222;
        this.errCred = false;
        this.registrar= false;
        this.mostrarCardRegistro = false;

      break;
      case "usuario@usuario.com":
        this.passw = 333333;
        this.errCred = false;
        this.registrar= false;
        this.mostrarCardRegistro = false;

      break;
      case "jugador1@jugador.com":
        this.passw = 444444;
        this.errCred = false;
        this.registrar= false;
        this.mostrarCardRegistro = false;

      break;
      case "jugador2@jugador.com":
        this.passw = 555555;
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
    let clave:Number = this.passw;
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
