import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { IngredienteService } from '../../services/ingrediente';
import { LojaService } from '../../services/loja';
import { PedidoService } from '../../services/pedido';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard implements OnInit {
  ingredientes: any[] = [];

  pedidos: any[] = [];

  lojaAberta = false;

  faturamento = 2840;

  constructor(
    private ingredienteService: IngredienteService,
    private lojaService: LojaService,
    private pedidoService: PedidoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.validarAdmin();

    this.carregarIngredientes();

    this.carregarPedidos();

    this.buscarStatusLoja();
  }

  validarAdmin() {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/login']);
    }
  }

  carregarIngredientes() {
    this.ingredienteService.listar().subscribe({
      next: (res: any) => {
        this.ingredientes = res;
      },

      error: (err: any) => {
        console.error(err);
      },
    });
  }

  carregarPedidos() {
    this.pedidoService.listarAdmin().subscribe({
      next: (res: any) => {
        this.pedidos = res;
      },

      error: (err: any) => {
        console.error(err);
      },
    });
  }

  buscarStatusLoja() {
    this.lojaService.status().subscribe({
      next: (res: any) => {
        this.lojaAberta = res.aberta;
      },

      error: (err: any) => {
        console.error(err);
      },
    });
  }

abrirLoja() {

  this.lojaService.abrir().subscribe({

    next: () => {

      this.lojaAberta = true;

    },

    error: (err: any) => {

      console.error(err);

    }

  });

}

fecharLoja() {

  this.lojaService.fechar().subscribe({

    next: () => {

      this.lojaAberta = false;

    },

    error: (err: any) => {

      console.error(err);

    }

  });

}

getIcone(nome: string) {

  const icons: any = {

    Mussarela: '🧀',

    Calabresa: '🍖',

    Pepperoni: '🍕',

    Molho: '🍅',

    Cebola: '🧅',

    Farinha: '🌾',

    Refrigerante: '🥤',

    Bacon: '🥓',

    Chocolate: '🍫',

    Frango: '🍗',

  };

  return icons[nome] || '📦';

}

  logout() {
    localStorage.removeItem('token');

    this.router.navigate(['/login']);
  }

  get estoqueBaixo() {
    return this.ingredientes.filter((item) => item.quantidade <= 10);
  }
}
