import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/login-service/login-service';


@IonicPage()
@Component({
  selector: 'page-voto',
  templateUrl: 'voto.html',
})
export class VotoPage {
  private voto:string="";

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private auth:LoginServiceProvider
  ) {}

  ionViewDidLoad() {
    //console.log('ionViewDidLoad VotoPage');
  }


  deslogear(){
    this.auth.logOut();
    this.navCtrl.goToRoot({});
  }

}
