import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/login-service/login-service';

import { Voto } from '../../clases/voto';
import { VotoServiceProvider } from "../../providers/voto-service/voto-service";
import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-voto',
  templateUrl: 'voto.html',
})
export class VotoPage {
  private perfil:string;
  private voto:string;
  private boolVoto:boolean;
  private votos:Subscription;
  private nombre:string;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              private auth:LoginServiceProvider, public alertCtrl:AlertController,
              private servicio:VotoServiceProvider
  )
  {

  }

  ionViewWillEnter(){
    this.nombre = this.navParams.get('nombre');
    this.boolVoto = this.servicio.verificarVotos(this.nombre);


  }

  ionViewDidLoad() {

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
              this.navCtrl.push('GraficoPage', {'mensaje':'Voto registrado exitosamente'});

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
    this.navCtrl.push('GraficoPage');
  }


  deslogear(){
    this.auth.logOut();
    this.navCtrl.goToRoot({});
  }

}

