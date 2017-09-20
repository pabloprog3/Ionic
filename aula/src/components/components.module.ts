import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion';

import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [InicioSesionComponent],
	imports: [IonicModule],
  exports: [InicioSesionComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ComponentsModule {}
