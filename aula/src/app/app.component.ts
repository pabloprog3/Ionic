import { Component, OnChanges} from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { HomePage } from '../pages/home/home';
import { TabshomePage } from "../pages/tabshome/tabshome";

@Component({
  templateUrl: 'app.html'
})
export class MyApp  {

  public rootPage:any = HomePage;

  constructor(public platform: Platform, statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
  }

  initializeApp(){
    this.platform.ready().then(()=>{
      setTimeout(()=>{
        this.splashScreen.hide();
      }, 100);
    });
  }


}

