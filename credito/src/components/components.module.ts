import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ScannerQrComponent } from './scanner-qr/scanner-qr';

import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [ScannerQrComponent],
	imports: [IonicModule],
  exports: [ScannerQrComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
