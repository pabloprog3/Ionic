export class Codigo{

  private texto:string[];
  private credito:number;

          constructor(){
             this.texto = new Array<string>();
             this.credito = 0;
          }

  public getTexto():string[]{
    return this.texto;
  }

  public setTexto(texto:string):void{
    this.texto.push(texto);
  }

  public setCredito(texto:string):void{
    switch (texto) {
      case '8c95def646b6127282ed50454b73240300dccabc':
            this.credito = 10;
        break;

      case 'ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172':
            this.credito = 50;
        break;

      case '2786f4877b9091dcad7f35751bfcf5d5ea712b2f':
            this.credito = 100;
        break;

      default:
        break;
    }
  }

  public getCredito():number{
    return this.credito;
  }



}
