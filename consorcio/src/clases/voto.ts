export class Voto{

        private nombre:string;
        private voto:string;

        constructor(){
            this.nombre = "";
            this.voto = "";
        }

        public setNombre(nombre:string):void{
          if (nombre != "" || nombre != undefined) {
            this.nombre=nombre;
          } else {
            return;
          }

        }

        public setVoto(voto:string):void{
          if (voto != "" || voto != undefined) {
            this.voto=voto;
          } else {
            return;
          }
        }

        public getNombre():string{
          return this.nombre;
        }

        public getVoto():string{
          return this.voto;
        }


}
