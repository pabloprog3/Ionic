import { Component, OnInit } from '@angular/core';

import { UsuarioServiceProvider } from '../../providers/usuario-service/usuario-service';
import { Usuario } from '../../clases/usuario';

@Component({
  selector: 'lista-usuarios',
  templateUrl: 'lista-usuarios.html'
})
export class ListaUsuariosComponent{
  private lista: Usuario[];

  constructor(private servicio:UsuarioServiceProvider

  ) {}

  ngOnInit() { this.getUsuarios(); }

  ngOnDestroy(){

  }

  getUsuarios(){
    this.servicio.getUsuariosLista().subscribe(usuarios=>this.lista=usuarios, err=>console.log(err));
  }




}
