import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VotoPage } from './voto';

@NgModule({
  declarations: [
    VotoPage,
  ],
  imports: [
    IonicPageModule.forChild(VotoPage),
  ],
})
export class VotoPageModule {}
