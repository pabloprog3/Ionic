import { Injectable } from '@angular/core';

import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { Observable } from 'rxjs/observable';
import { Imagen } from '../../clases/imagen'
import  "firebase/storage";
import * as firebase from "firebase/app";


@Injectable()
export class ImagenServiceProvider {

  private fotos:FirebaseListObservable<Imagen[]>;

  constructor(private db:AngularFireDatabase) {

  }

  getListaFotos(){
    //this.fotos = this.db.list('gs://aula-e6937.appspot.com/imagenes') as FirebaseListObservable<Imagen[]>;
    //return this.fotos;
  }


  subirImagenFirebase(imagen:Imagen){
    //obtener referencia
    let storage = firebase.storage().ref('gs://aula-e6937.appspot.com/').child('imagenes/' + imagen.getNombre());

    //guardar archivo
    storage.putString(imagen.getFoto()).then(function (snapshot) {

    });




    //let storage=firebase.storage().ref('imagenes/');
    //let upload = storage.put(imagen);
    //storage.putString(imagen.getFoto(), 'data_url');
    //this.fotos.push(imagen);
  }

}
