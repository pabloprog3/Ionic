import { Injectable } from '@angular/core';
import {AlertController} from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Usuario } from '../../clases/usuario';


@Injectable()
export class LoginServiceProvider {

  constructor(private db: AngularFireDatabase, private auth: AngularFireAuth,
              public alertCtrl:AlertController
  ) {
    //this.lista = this.getPerfilLogin();
    this.loginUsuario = new Usuario();
  }

  private mail: string = "";
  private validUser:FirebaseListObservable<any[]>;
  private lista: FirebaseListObservable<Usuario[]>;
  private loginUsuario: Usuario;
  private usuarios: Usuario[];


  loginUser(correo: string, clave: string) {
    return this.auth.auth.signInWithEmailAndPassword(correo, clave)
      .then(user => {

      })
      .catch(err => Promise.reject(err=>{console.log(err)}))

  }


  public logOut() {
    this.auth.auth.signOut();

  }


}
