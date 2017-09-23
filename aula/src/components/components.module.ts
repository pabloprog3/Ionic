import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion';

import { IonicModule } from 'ionic-angular';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios';

@NgModule({
	declarations: [InicioSesionComponent,
    ListaUsuariosComponent],
	imports: [IonicModule],
  exports: [InicioSesionComponent,
    ListaUsuariosComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ComponentsModule {}
