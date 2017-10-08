import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListauserPage } from './listauser';

@NgModule({
  declarations: [
    ListauserPage,
  ],
  imports: [
    IonicPageModule.forChild(ListauserPage),
  ],
})
export class ListauserPageModule {}
