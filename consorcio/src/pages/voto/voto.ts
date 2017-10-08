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
  private mostrarGrafico:boolean;
  private boolVoto:boolean;
  private votos:Subscription;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              private auth:LoginServiceProvider, public alertCtrl:AlertController,
              private servicio:VotoServiceProvider
  ) {}

  ionViewDidLoad() {
    this.boolVoto=false;
    this.mostrarGrafico = false;
    //console.log('ionViewDidLoad VotoPage');
    //console.log(this.perfil);
    this.voto = "";
    this.votos = this.servicio.getVotosLista().subscribe(
      votos=>{
                this.existeVoto(votos);
             }
    )

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

            if (this.boolVoto) {
              let msjAlert = this.alertCtrl.create({
                subTitle: 'Usted ya emitió su voto',
                buttons: ['Aceptar']
              });
              msjAlert.present();
            } else {
              this.servicio.guardarVoto(objVoto);
              let msjAlert = this.alertCtrl.create({
                subTitle: 'Voto registrado correctamente',
                buttons: ['Aceptar']
              });
              msjAlert.present();
            }

      } catch (error) {
        let msjAlert = this.alertCtrl.create({
          subTitle: 'Ocurrió un error al grabar el voto',
          buttons: ['Aceptar']
        });
        msjAlert.present();
      }
    }
  }

  private existeVoto(votos:Voto[]):void{
    votos.forEach(voto => {
      if (voto['nombre']==this.navParams.get('nombre')) {
        this.boolVoto=true;
      }
    });
  }

  private mostrarResultados():void{
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

