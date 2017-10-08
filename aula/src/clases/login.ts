export class Login{

      private nombre:string;
      private sexo:string;
      private perfil:string;
      private correo:string;

      constructor(){
          this.nombre = "";
          this.sexo = "";
          this.perfil = "";
          this.correo = "";
      }

      public getNombre():string{
          return this.nombre;
      }

      public getSexo():string{
          return this.sexo;
      }
      public getPerfil():string{
        return this.perfil;
    }

      public getCorreo():string{
        return this.correo;
      }

      public setNombre(nombre:string){
        if (nombre != "" && nombre != undefined) {
          this.nombre = nombre;
        }
    }

      public setSexo(sexo:string){
        if (sexo != "") {
          this.sexo = sexo;
        }
      }

      public setPerfil(perfil:string){
        if (perfil != "" && perfil != undefined) {
          this.perfil = perfil;
        }
      }

      public setCorreo(correo:string){
        if (correo != '') {
          this.correo = correo;
        }
      }

}
