export class Login{

      private nombre:string;
      private clave:number;
      private perfil:string;

      constructor(){
          this.nombre = "";
          this.clave = null;
          this.perfil = "";
      }

      public getNombre():string{
          return this.nombre;
      }

      public getClave():number{
          return this.clave;
      }
      public getPerfil():string{
        return this.perfil;
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

      public setPerfil(perfil:string){
        if (perfil != "" && perfil != undefined) {
          this.perfil = perfil;
        }
      }

}
