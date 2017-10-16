import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-grafico',
  templateUrl: 'grafico.html',
})
export class GraficoPage {
  private fechaHoy:string;
  private mensaje:string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
   this.fechaHoy = new Date().toLocaleDateString();
   this.mensaje = this.navParams.get('mensaje');

  }

}
