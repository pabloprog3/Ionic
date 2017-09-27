import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/login-service/login-service';

import { Voto } from '../../clases/voto';
import { VotoServiceProvider } from "../../providers/voto-service/voto-service";


@IonicPage()
@Component({
  selector: 'page-voto',
  templateUrl: 'voto.html',
})
export class VotoPage {
  private perfil:string;
  private voto:string;
  private mostrarGrafico:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private auth:LoginServiceProvider, public alertCtrl:AlertController,
              private servicio:VotoServiceProvider
  ) {}

  ionViewDidLoad() {
    this.mostrarGrafico = false;
    //console.log('ionViewDidLoad VotoPage');
    this.perfil = this.navParams.get('perfil');
    //console.log(this.perfil);
    this.voto = "";
  }


  private votar():void{
    if (this.voto == "") {
      let msjAlert = this.alertCtrl.create({
        title: '¡Voto incorrecto!',
        subTitle: 'Debe seleccionar una opción',
        buttons: ['Aceptar']
      });
      msjAlert.present();
    } else {
      let objVoto = new Voto();
      objVoto.setNombre(this.navParams.get('nombre'));
      objVoto.setVoto(this.voto);
      try {

        this.servicio.guardarVoto(objVoto);
        let msjAlert = this.alertCtrl.create({
          subTitle: 'Voto registrado correctamente',
          buttons: ['Aceptar']
        });
        msjAlert.present();
      } catch (error) {
        let msjAlert = this.alertCtrl.create({
          subTitle: 'Ocurrió un error al grabar el voto',
          buttons: ['Aceptar']
        });
        msjAlert.present();
      }



    }
  }

  private mostrarResultados():void{
    console.log(this.mostrarGrafico);
    if (this.mostrarGrafico) {
      this.mostrarGrafico = false;
    } else {
      this.mostrarGrafico = true;
    }

  }


  deslogear(){
    this.auth.logOut();
    this.navCtrl.goToRoot({});
  }

}
