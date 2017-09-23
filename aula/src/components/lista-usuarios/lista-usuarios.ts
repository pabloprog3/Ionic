import { Component, OnInit } from '@angular/core';

import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { Usuario } from '../../clases/usuario';

@Component({
  selector: 'lista-usuarios',
  templateUrl: 'lista-usuarios.html'
})
export class ListaUsuariosComponent {
  private lista: Usuario[];

  constructor(private servicio:LoginServiceProvider

  ) {}

  ngOnInit() { this.getUsuarios(); }

  getUsuarios(){
    this.servicio.getPerfilLogin().subscribe(usuarios=>this.lista=usuarios, err=>console.log(err));
  }




}
