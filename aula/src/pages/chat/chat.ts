import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})


export class ChatPage {

  private nombreSala:string;
  private MAX_MENSAJE:number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.nombreSala = this.navParams.get('sala');
    this.MAX_MENSAJE = 66;
  }

  private changeMsj(tecla:KeyboardEvent):void{
    //console.log(tecla.charCode);
   /* if (this.MAX_MENSAJE == 0) {
        //tecla.preventDefault();
    }

    if (tecla.charCode == 08) {
        this.MAX_MENSAJE += 1;
    }else{
        this.MAX_MENSAJE -= 1;
    }*/

  }

  private volver():void{
    if(this.navCtrl.canGoBack()){
      this.navCtrl.popTo('HomePage');
    }
  }

}
