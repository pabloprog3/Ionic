import { NgModule, CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA } from '@angular/core';
import { ResultadosComponent } from './resultados/resultados';

import { IonicModule } from 'ionic-angular';
import { ChartsModule } from "ng2-charts";


@NgModule({
	declarations: [ResultadosComponent],
	imports: [IonicModule,ChartsModule],
  exports: [ResultadosComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class ComponentsModule {}
