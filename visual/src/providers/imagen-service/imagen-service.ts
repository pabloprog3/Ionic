import { Injectable } from '@angular/core';

import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { Observable } from 'rxjs/observable';
import { Imagen } from '../../clases/imagen'
import { Usuario } from '../../clases/usuario';
import  "firebase/storage";
import * as firebase from "firebase/app";


@Injectable()
export class ImagenServiceProvider {

  private fotos:FirebaseListObservable<any[]>;
  private storageRef: any;
  private usuarios:FirebaseListObservable<Usuario[]>;

  constructor(private db:AngularFireDatabase) {
    this.storageRef = firebase.storage().ref().child('imagenes');
  }

  getUsuariosLista(){
    this.usuarios = this.db.list('/usuarios') as FirebaseListObservable<Usuario[]>;
    return this.usuarios;
  }

  guardarLinkFoto(nombre:string, path:string, uid:string){
    let foto = new Imagen();
    foto.setNombre(nombre);
    foto.setFoto(path);
    this.db.database.ref('/fotos/'+uid+'/').push(foto);
  }

  getListaFotos(nombre:string){
    this.fotos = this.db.list('fotos/'+nombre) as FirebaseListObservable<any[]>;
    return this.fotos;
  }




}
