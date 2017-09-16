import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';  
import {AboutPage} from '../about/about';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  Login = {
    usuario: "usuario1@mail.com",
    clave: "123456"
  };
  logueado:Boolean=false;

  constructor(public navCtrl: NavController, public authData: AuthData) {
    
  }

  login() {
    
         
                // Inicio sesion en Firebase.
                this.authData.loginUser(this.Login.usuario, this.Login.clave).then(authData => {
                  console.info("se logueo correctamente!");
                  this.logueado=true;
                },
                error => { 
                    console.log('loginError: ', error);  
                    alert("Usuario o clave incorrecta");  
                });
     
  }
  
  desloguear()
  {

  }



}
