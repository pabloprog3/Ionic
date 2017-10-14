import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

//import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { BarcodeScanner, BarcodeScannerOptions, BarcodeScanResult } from '@ionic-native/barcode-scanner';
import { CodeProvider } from "../../providers/code/code";
import {Codigo} from '../../clases/codigo';
import { Subscription } from "rxjs";

@IonicPage()
@Component({
  selector: 'page-scanner',
  templateUrl: 'scanner.html',
})
export class ScannerPage {

  private texto:string;
  private uid:string;
  private credito: number=0;
  private dataCode:Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public barcodeScanner:BarcodeScanner, private servicio:CodeProvider,
              public alertCtrl:AlertController
  ) {}

  ionViewDidLoad() {
    this.uid = this.navParams.get('uid');
    console.log('uid:', this.navParams.get('uid'));
    //this.dataCode = this.servicio.getCodigos(this.uid).subscribe();
    console.log('data code user:', this.dataCode);
  }

  async iniciarScan(){
   let resultado:BarcodeScanResult = await this.barcodeScanner.scan();
   this.texto = resultado.text;
   let codigo:Codigo = new Codigo();
   codigo.setTexto(this.texto);
   codigo.setCredito(this.texto);
   this.servicio.guardarCodigo(codigo, this.uid);
   //this.cargarCredito();
    /*this.barcodeScanner.scan({
      orientation: 'portrait',
    }).then(resultado=>{
      let result:string = resultado.text;
      this.texto = result.trim();
      this.cargarCredito();
      /*let msj = this.alertCtrl.create({
        subTitle: 'codigo:' + codigo.getTexto() + ';'+codigo.getCredito(),
        buttons:[{
          text: 'Confirmar',
          handler: ()=>{
            this.cargarCredito(codigo);
          }
        }]
      });
      msj.present();*/
      //this.cargarCredito(result);
   /* },
      err=>{
        let msj = this.alertCtrl.create({
          subTitle: 'Se ha producido un error al escanear. Vuelva a intentarlo',
          buttons:['Volver']
        });
        msj.present();
      });
    */
  }

  cargarCredito(texto:string){
    let codigo:Codigo = new Codigo();
    codigo.setTexto(texto);
    codigo.setCredito(texto);
    this.servicio.guardarCodigo(codigo, this.uid);

  }



}
