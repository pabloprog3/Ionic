import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Usuario } from '../../clases/usuario';

@Injectable()
export class UsuarioServiceProvider {
  private usuarios:FirebaseListObservable<Usuario[]>;

  constructor(private db:AngularFireDatabase, private auth:AngularFireAuth) {
        this.getUsuariosLista();
  }

  getUsuariosLista(){
    this.usuarios = this.db.list('/usuarios') as FirebaseListObservable<Usuario[]>;
    return this.usuarios;
  }

  getUserUID(){
    return this.auth.auth.currentUser.uid;
  }

  guardarUsuario(usuario:Usuario){
    this.usuarios.push(usuario)

  }



}
