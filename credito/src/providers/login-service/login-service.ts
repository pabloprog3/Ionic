import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Usuario } from '../../clases/usuario';


@Injectable()
export class LoginServiceProvider {

  constructor(public db:AngularFireDatabase, private auth:AngularFireAuth) {
    //this.getUsuariosLista();
  }

  private mail:string="";
  private lista:FirebaseListObservable<any[]>;
  private usuario:Usuario;
  private usuarios: FirebaseListObservable<Usuario[]>;

  loginUser(correo:string, clave:string){
    return this.auth.auth.signInWithEmailAndPassword(correo, clave)
      .then(user=>{

      })
      .catch(err=>Promise.reject(err=>{console.log(err)}))
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

  getUsuariosLista(){
    this.usuarios = this.db.list('/usuarios') as FirebaseListObservable<Usuario[]>;
    return this.usuarios;
  }

  public getUserUID():string{
    return this.auth.auth.currentUser.uid;
  }


  public logOut(){
    this.auth.auth.signOut();
  }


}
