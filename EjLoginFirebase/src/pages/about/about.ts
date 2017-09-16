import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  miusuario = {
    u: "",
    c: ""
  }
  constructor(public navCtrl: NavController) {

  }

}
