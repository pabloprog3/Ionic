import { Component } from '@angular/core';



@Component({
  selector: 'inicio-sesion',
  templateUrl: 'inicio-sesion.html'
})
export class InicioSesionComponent {

  private nombre: string = "";
  private passw1: any;
  private passw2: any = null;
  private enPassw: boolean = true;
  private OkError: string = "";
  private textoOkError: string = "";
  private mostrarTextoInf: boolean = false;
  private iconOkErr: string = "";
  private rSexo: string = "";
  private rPerfil: string = "";

  constructor() {

  }

  private confirmPassw():void{
      if (this.passw1 != null && this.passw1 != "") {
        this.enPassw = false;
        this.textoOkError
      } else {
        this.enPassw = true;
        if (this.passw1 == "") {
          this.passw2 = null;
        }

      }
  }

  private textoInf():void{
    if(this.passw1 != "" && this.passw2 != ""){
      this.mostrarTextoInf = true;
    }else{
      this.mostrarTextoInf = false;
    }
    if(this.passw1 != this.passw2){
      this.OkError="danger";
      this.textoOkError="Las claves no coinciden";
      this.iconOkErr = "close";
    }else{
      this.OkError="secondary";
      this.textoOkError="Las claves coinciden";
      this.iconOkErr = "checkmark";
    }
  }




}//fin clase
