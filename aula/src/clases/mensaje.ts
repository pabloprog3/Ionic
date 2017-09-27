export class Mensaje{

      private fecha:string;
      private nombre:string;
      private mensaje:string;
      private aula:string;

      constructor()
      {
        this.fecha = this.convertirFecha(new Date());
        this.nombre = "";
        this.mensaje = "";
        this.aula = "";

      }

      private convertirFecha(fecha:Date):string{
          return fecha.toLocaleDateString() + " " + fecha.toLocaleTimeString();
      }

      public getFecha():string{
        return this.fecha;
      }
      public getNombre():string{
        return this.nombre;
      }
      public getMensaje():string{
        return this.mensaje;
      }
      public getAula():string{
        return this.aula;
      }

      public setNombre(nombre:string):void{
        if (nombre != "") {
          this.nombre = nombre;
        } else {
          return;
        }
      }
      public setMensaje(msj:string):void{
        if (msj != "") {
          this.mensaje = msj;
        } else {
          return;
        }
      }
      public setAula(aula:string):void{
        this.aula = aula;
      }





}
