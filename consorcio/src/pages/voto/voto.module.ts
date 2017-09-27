import { NgModule,NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VotoPage } from './voto';

import {ComponentsModule} from '../../components/components.module';


@NgModule({
  declarations: [
    VotoPage,
  ],
  imports: [
    IonicPageModule.forChild(VotoPage),
    ComponentsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class VotoPageModule {}
