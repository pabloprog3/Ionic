import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabshomePage } from './tabshome';

@NgModule({
  declarations: [
    TabshomePage,
  ],
  imports: [
    IonicPageModule.forChild(TabshomePage),
  ],
  exports:[
    TabshomePage,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TabshomePageModule {}
