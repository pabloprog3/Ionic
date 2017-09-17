export class Login{

      private nombre:string;
      private clave:number;

      constructor(){
          this.nombre = "";
          this.clave = null;
      }

      public getNombre():string{
          return this.nombre;
      }

      public getClave():number{
          return this.clave;
      }

      public setNombre(nombre:string){
        if (nombre != "" && nombre != undefined) {
          this.nombre = nombre;
        }

    }

      public setClave(clave:number){
        if (clave != null && clave != undefined) {
          this.clave = clave;
        }
      }

}