import { Component, OnInit, Input } from '@angular/core';

import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
//import { Camera } from '@ionic-native/camera';

@Component({
  selector: 'scanner-qr',
  templateUrl: 'scanner-qr.html'
})
export class ScannerQrComponent {
  @Input() perfil:string;
  private texto:string;

  constructor(private qrScanner: QRScanner) {
    console.log('Hello ScannerQrComponent Component');

  }

  ngOnInit(){
    console.log(this.perfil);
  }

  iniciarScan(){
    let scanSub = this.qrScanner.scan().subscribe((text: string) => {
      console.log('Scanned something', text);
      this.texto = text;
      //this.qrScanner.hide(); // hide camera preview
      //scanSub.unsubscribe(); // stop scanning
      //this.qrScanner.useBackCamera();
    });

   let status:any =  this.qrScanner.show();
    console.log('state', status);



  }

}
