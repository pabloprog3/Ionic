import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';

import { VotoServiceProvider } from "../../providers/voto-service/voto-service";
import { FirebaseListObservable } from "angularfire2/database";
import { Voto } from "../../clases/voto";
import * as Chart from 'chart.js';
import { Subscription } from 'rxjs/Subscription';



@Component({
  selector: 'resultados',
  templateUrl: 'resultados.html'
})
export class ResultadosComponent implements OnChanges {
  private votos:Subscription;
  private contMatafuegos:number=0;
  private contPlantas:number=0;


  constructor(private servicio:VotoServiceProvider) {
    this.barChartData=new Array();
    this.barChartData = [
      {data: 0, label: 'Matafuegos'},
      {data: 0, label: 'Plantas'}
    ];
  }

  ngOnChanges(){

  }

  ngOnDestroy(){
    this.votos.unsubscribe();
  }

  ngOnInit(){

    this.votos=this.servicio.getVotosLista().subscribe(
      votos=>{
              this.contMatafuegos=0;
              this.contPlantas=0;
              this.llenarData(votos);
      },

        err=>{console.log(err)},
        () => {this.contMatafuegos=0; this.contPlantas=0;}
    )
  }



  private llenarData(votos:Voto[]){

    votos.forEach(votos => {
      if (votos['voto']=="matafuegos") {
        this.contMatafuegos+=1;
      } else {
        this.contPlantas+=1;
      }
    });
    this.barChartData = [
      {data: [this.contMatafuegos], label: 'Matafuegos'},
      {data: [this.contPlantas], label: 'Plantas'}
    ];

  }

  public barChartData:any[];


  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['2017'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;




  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }



}
