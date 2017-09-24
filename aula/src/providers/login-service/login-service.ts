import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Usuario } from '../../clases/usuario';


@Injectable()
export class LoginServiceProvider {

  constructor(private db:AngularFireDatabase, private auth:AngularFireAuth) {

  }

  private mail:string="";
  private lista:FirebaseListObservable<any[]>;
  private usuario:Usuario;

  loginUser(correo:string, clave:string){
    this.usuario = new Usuario();
    return this.auth.auth.signInWithEmailAndPassword(correo, clave)
      .then(user=>Promise.resolve(this.mail=user.email))
      .catch(err=>Promise.reject(err))

      //this.getPerfilLogin();
  }

   public getPerfilLogin(){
     this.lista = this.db.list('/usuarios', {
      query: {
        orderByChild: 'clave'
      }
    }) as FirebaseListObservable<any[]>;
    return this.lista;
    //console.log(this.lista.$ref.orderByChild('/usuarios'));
  }

  public logOut(){
    this.auth.auth.signOut();
  }


}
