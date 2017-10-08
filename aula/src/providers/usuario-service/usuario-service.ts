import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { Usuario } from '../../clases/usuario';
import { Login }from '../../clases/login';
import { Mensaje } from '../../clases/mensaje';

@Injectable()
export class UsuarioServiceProvider {
  private usuarios:FirebaseListObservable<Usuario[]>;
  private mensajes:FirebaseListObservable<Mensaje[]>;

  constructor(private db:AngularFireDatabase, private auth:AngularFireAuth) {
        this.getUsuariosLista();
        //this.getMensajesLista();
  }

  getUsuariosLista(){
    this.usuarios = this.db.list('/usuarios') as FirebaseListObservable<Usuario[]>;
    return this.usuarios;
  }


  getUserUID(){
    return this.auth.auth.currentUser.uid;
  }

  guardarUsuario(loginDB:Login, usuario:Usuario){
    this.auth.auth.createUserWithEmailAndPassword(usuario.getCorreo(), usuario.getClave().toString());
    this.usuarios.push(loginDB);
  }

  getMensajesLista(aula:string){
    this.mensajes = this.db.list('/mensajes', {
      query: {
            orderByChild: "aula",
            equalTo: aula
      }
    }) as FirebaseListObservable<Mensaje[]>;
    return this.mensajes;
  }

  guardarMensaje(mensaje:Mensaje){
    this.db.database.ref('/mensajes').push(mensaje);
  }


}
