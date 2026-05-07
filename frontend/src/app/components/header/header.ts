import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  usuarioNome = '';

  logado = false;

  isAdmin = false;

  ngOnInit(): void {
    const nome = localStorage.getItem('usuario_nome');

    const tipo = localStorage.getItem('tipo_usuario');

    if (tipo === 'admin') {
      this.usuarioNome = 'Admin';

      this.logado = true;

      this.isAdmin = true;

      return;
    }

    if (nome) {
      this.usuarioNome = nome;

      this.logado = true;
    }
  }
}
