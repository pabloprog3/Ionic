import { Injectable } from '@angular/core';
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from "angularfire2/database";
import { Codigo } from "../../clases/codigo";

@Injectable()
export class CodeProvider {

  private code: Codigo;
  private codigos: FirebaseListObservable<Codigo[]>;

  constructor(private db:AngularFireDatabase) {
    this.getCodigosLista();
  }

  getCodigosLista(){
    this.codigos = this.db.list('/codigos') as FirebaseListObservable<Codigo[]>;
    return this.codigos;
  }

  getCodigos(uid:string){
   return this.db.object('/codigos/'+uid) as FirebaseObjectObservable<Codigo>;
  }

  guardarCodigo(codigo:Codigo, uid:string){
    this.db.database.ref('codigos/'+uid+'/').push(codigo);
  }


}
