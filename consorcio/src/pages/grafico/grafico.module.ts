import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GraficoPage } from './grafico';

import {ComponentsModule} from '../../components/components.module';

@NgModule({
  declarations: [
    GraficoPage,
  ],
  imports: [
    IonicPageModule.forChild(GraficoPage),
    ComponentsModule
  ],
})
export class GraficoPageModule {}
