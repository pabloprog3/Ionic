import { Component } from '@angular/core';
import { NavController } from 'ionic-angular'; 
// import {firebaseconfig} from '../firebase/';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  dato: FirebaseListObservable<any[]>;
  palabra;
  
  constructor(public navCtrl: NavController, af: AngularFireDatabase) {
    this.dato = af.list('/dato');
  }

  agregarDato()
  {
    this.dato.push({"palabra":this.palabra});

   
  }
}
