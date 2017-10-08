import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ImagenServiceProvider} from '../../providers/imagen-service/imagen-service';

import { Imagen } from "../../clases/imagen";


@IonicPage()
@Component({
  selector: 'page-listado',
  templateUrl: 'listado.html',
})
export class ListadoPage {

  private nombreUser:string;
  private uid:string;
  private fotos:Imagen[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private servicioDB:ImagenServiceProvider
  ){

  }

  ionViewDidLoad() {
    this.nombreUser = this.navParams.get('nombre');
    this.uid = this.navParams.get('uid');

    this.servicioDB.getListaFotos(this.uid)
    .subscribe(fotos => {
        this.fotos = fotos;
      },
        err => console.log(err));

  }

}
