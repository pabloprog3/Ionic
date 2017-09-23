import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminPage } from './admin';

import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AdminPage

  ],
  imports: [
    IonicPageModule.forChild(AdminPage),
    ComponentsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminPageModule {}
