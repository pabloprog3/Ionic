import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Media, MediaObject } from '@ionic-native/media';

@IonicPage()
@Component({
  selector: 'page-sonidos',
  templateUrl: 'sonidos.html',
})
export class SonidosPage {

  private enablePlay:boolean;
  private enableBtnUno:boolean;
  private enableBtnDos:boolean;
  private enableBtnTres:boolean;
  private enableBtnCuatro:boolean;
  private enableBtnCinco:boolean;
  private listaMP3:Array<string>;
  private path:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private media: Media
  ) {}

  ionViewDidLoad() {
    this.listaMP3 = new Array();
    this.path = '../../assets/mp3/animales/';
    this.enablePlay = true;
    this.enableBtnUno = false;
    this.enableBtnDos = false;
    this.enableBtnTres = false;
    this.enableBtnCuatro = false;
    this.enableBtnCinco = false;
  }

  selectMP3(value:string){
    value = value.toLowerCase();
    console.log('valor: ', value);
    console.log('path: ', this.path);
    if (value != "" && value != undefined) {
      this.enablePlay = false;
    }
    switch (value) {
    case 'aves':
      this.listaMP3.push(this.path+'aves.mp3');
      this.enableBtnUno = true;
    break;
    case 'mono':
      this.listaMP3.push(this.path+'mono.mp3');
      this.enableBtnTres = true;
    break;

    case 'gato':
      this.listaMP3.push(this.path+'gato.mp3');
      this.enableBtnCuatro = true;
    break;

    case 'perro':
      this.listaMP3.push(this.path+'perro.mp3');
      this.enableBtnCinco = true;
    break;

    case 'leon':
      this.listaMP3.push(this.path+'leon.mp3');
      this.enableBtnDos = true;
    break;


      default:
        break;
    }
    console.log(this.listaMP3.values());
  }


  play(){

    this.listaMP3.forEach(sonido => {
      if (sonido != "" && sonido != null && sonido != undefined) {
        let file: MediaObject = this.media.create(sonido)
        file.play();
      }
    });

  }

  restablecer(){
    this.enableBtnUno = false;
    this.enableBtnDos = false;
    this.enableBtnTres = false;
    this.enableBtnCuatro = false;
    this.enableBtnCinco = false;
  }


}
