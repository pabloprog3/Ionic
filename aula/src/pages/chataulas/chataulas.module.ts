import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChataulasPage } from './chataulas';

@NgModule({
  declarations: [
    ChataulasPage,
  ],
  imports: [
    IonicPageModule.forChild(ChataulasPage),
  ],
  exports:[
    ChataulasPage,
  ]
})
export class ChataulasPageModule {}
