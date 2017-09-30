import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { Imagen } from '../../clases/imagen'
import { ImagenServiceProvider } from '../../providers/imagen-service/imagen-service';

import * as firebase from 'firebase';
import 'whatwg-fetch';

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})

export class AdminPage {
  private options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true
  };

  private imagen: Imagen;
  private imagenes: Imagen[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public camera: Camera, public alertCtrl: AlertController,
    private servicio: ImagenServiceProvider
  ) { }

  private  configFirebase = {
    apiKey: "AIzaSyAdXMV2gkladQLgTcKgNjuAgfDT1ok5Ijs",
    authDomain: "aula-e6937.firebaseapp.com",
    databaseURL: "https://aula-e6937.firebaseio.com",
    projectId: "aula-e6937",
    storageBucket: "aula-e6937.appspot.com",
    messagingSenderId: "433695017385"
  };


  ionViewDidLoad() {
    this.imagen = new Imagen();
    this.imagen.setNombre(this.navParams.get('nombre'));
    firebase.initializeApp(this.configFirebase);
    //this.servicio.getListaFotos().subscribe(
    //  fotos=>this.imagenes=fotos
    //);
  }

  private fileImagen(imagen){
    return fetch(imagen).then((_response)=>{
      return _response.blob();
    }).then((_blob) => {
      return _blob;
    })
  }

  private uploadFirebase(imagen){
    var fileName = this.imagen.getNombre() + '.jpg';

    return new Promise((resolve, reject) => {
          var fileRef = firebase.storage().ref('imagenes/' + fileName);
          var uploadTask = fileRef.put(imagen);
    });
  }

  private encenderCamara(): void {

    this.camera.getPicture({
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      targetHeight: 640,
      correctOrientation: true
    }).then((image) => {
            return this.fileImagen(image);
          }).then((_imageBlob) => {
                  this.uploadFirebase(_imageBlob);
              })


    /*this.camera.getPicture(this.options).then((imageData) => {
      let foto = 'data:image/jpeg;base64,' + imageData;
      this.imagen.setFoto(foto);

      this.servicio.subirImagenFirebase(this.imagen);
      let msjAlert = this.alertCtrl.create({
          subTitle: "Imagen subida exitosamente",
          buttons: ['Aceptar']
      });
      msjAlert.present();
    },
      (err)=> {
                let msjAlert = this.alertCtrl.create({
                    subTitle: "Error al subir imagen: " + err,
                    buttons: ['Aceptar']
                 });
                msjAlert.present();
      }
    );*/
  }


  listarFotos() {

  }


}
