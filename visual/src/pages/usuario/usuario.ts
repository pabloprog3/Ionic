import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';

import {storage, initializeApp}  from 'firebase';
import * as firebase from 'firebase';
import { configFirebase } from "../../app/firebaseConfig";
import 'whatwg-fetch';

@IonicPage()
@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})

export class UsuarioPage {

 private imagen:any;
 private nombreUser:string;
 private storageRef = firebase.storage().ref();

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public camera: Camera, public alertCtrl: AlertController
  ) {

    }


  ionViewDidLoad() {
    this.nombreUser = this.navParams.get('nombre');
    console.log(this.nombreUser);
  }

  async encenderCamara(){
    try {
      let options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        targetHeight: 600,
        targetWidth: 600,
        correctOrientation: true,
        saveToPhotoAlbum: true
      };

      this.camera.getPicture(options).then((_imagen)=>{
        let imagenData = 'data:image/jpeg;base64,' + _imagen;
        this.imagen = imagenData;
        let upload = this.storageRef.child('imagenes/'+ this.nombreUser+ '/' +new Date().getTime()+'.jpg').putString(_imagen,'base64');


        upload.then(()=>{
          let msjOK = this.alertCtrl.create({
            subTitle: 'Imagen almacenada exitosamente en Firebase!!!',
            buttons: ['Confirmar']
           });
           msjOK.present();
        });

      });

    } catch (error) {

     let msjERR = this.alertCtrl.create({
      subTitle: 'Error al subir la imagen.Vuelva a intentarlo',
      buttons: ['Volver']
     });
     msjERR.present();
    }

  }

}
