import { Injectable } from '@angular/core';
import {AlertController} from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Usuario } from '../../clases/usuario';


@Injectable()
export class LoginServiceProvider {

  constructor(public db:AngularFireDatabase, private auth:AngularFireAuth,
              public alertCtrl:AlertController
  ) {}

  private mail:string="";
  private lista:FirebaseListObservable<any[]>;
  private usuario:Usuario;
  private usuarios:FirebaseListObservable<Usuario[]>;

  loginUser(correo:string, clave:string){
    return this.auth.auth.signInWithEmailAndPassword(correo, clave).then(user=>{
      let msj = this.alertCtrl.create({
        subTitle: 'auth: ' + user
      });
      msj.present();
    }, err=>{
      let msj = this.alertCtrl.create({
        subTitle: 'auth error: ' + err + '; ' + err.message
      });
      msj.present();
    });
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

  public logOut(){
    this.auth.auth.signOut();
  }


}
