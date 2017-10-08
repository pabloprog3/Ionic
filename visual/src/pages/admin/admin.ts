import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';

import { ImagenServiceProvider } from "../../providers/imagen-service/imagen-service";
import {AngularFireDatabase} from 'angularfire2/database';
import {storage, initializeApp}  from 'firebase';
import * as firebase from 'firebase';
import { configFirebase } from "../../app/firebaseConfig";
import 'whatwg-fetch';

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})

export class AdminPage {

 private imagen:any;
 private nombreUser:string;
 private userUID:string;
 private storageRef = firebase.storage().ref();
 private fotos: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public camera: Camera, public alertCtrl: AlertController, private servicioDB:ImagenServiceProvider,
    private db:AngularFireDatabase
  ) {

    }


  ionViewDidLoad() {
    this.nombreUser = this.navParams.get('nombre');
    this.userUID = this.navParams.get('uid');
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
        let fecha:number = new Date().getTime();
        //const path:string = 'gs://aula-e6937.appspot.com/imagenes/'+this.nombreUser+'/'+fecha+'.jpg';
        let imagenData = 'data:image/jpeg;base64,' + _imagen;
        this.imagen = imagenData;
        let upload = this.storageRef.child('imagenes/'+ this.nombreUser+ '/'+fecha+'.jpg').putString(_imagen,'base64');

        upload.then((snapshot)=>{
          this.servicioDB.guardarLinkFoto(this.nombreUser, snapshot.downloadURL, this.userUID);
          let msjOK = this.alertCtrl.create({
            subTitle: 'Imagen almacenada exitosamente en Firebase!!!',
            buttons: ['Aceptar']
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


  listarFotos() {
    this.navCtrl.push('ListadoPage', {'nombre':this.nombreUser, 'uid':this.userUID});
  }


}
