import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

//mis importaciones
import { Firebase } from '@ionic-native/firebase';
import { ComponentsModule } from '../components/components.module';
import { InicioSesionComponent } from '../components/inicio-sesion/inicio-sesion';
import { LoginServiceProvider } from '../providers/login-service/login-service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule }  from 'angularfire2/auth';
import { UsuarioServiceProvider } from '../providers/usuario-service/usuario-service';

import { TabshomePageModule } from "../pages/tabshome/tabshome.module";
import { ChataulasPage } from "../pages/chataulas/chataulas";
import { ListauserPage } from "../pages/listauser/listauser";
import { RegistrouserPage } from "../pages/registrouser/registrouser";

export const  configFirebase = {
  apiKey: "AIzaSyAdXMV2gkladQLgTcKgNjuAgfDT1ok5Ijs",
  authDomain: "aula-e6937.firebaseapp.com",
  databaseURL: "https://aula-e6937.firebaseio.com",
  projectId: "aula-e6937",
  storageBucket: "aula-e6937.appspot.com",
  messagingSenderId: "433695017385"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,


  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ComponentsModule,
    AngularFireModule.initializeApp(configFirebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    TabshomePageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,

  ],
  providers: [
    StatusBar,
    Firebase,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginServiceProvider,
    UsuarioServiceProvider
  ]
})
export class AppModule {}
