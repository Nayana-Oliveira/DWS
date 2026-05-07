import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css'],
})
export class Checkout implements OnInit {
  metodo = 'pix';

  pedido: any[] = [];

  subtotal = 0;

  entrega = 8;

  total = 0;

  nomeCartao = '';
  numeroCartao = '';
  validade = '';
  cvv = '';

  troco = '';

  constructor(
    private change: ChangeDetectorRef,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const dados = localStorage.getItem('carrinho');

    console.log('LOCAL STORAGE:', dados);

    if (dados) {
      this.pedido = JSON.parse(dados);

      console.log('PEDIDOS:', this.pedido);

      this.calcularTotal();
    }
  }

  calcularTotal() {
    this.subtotal = this.pedido.reduce(
      (acc, item) => {
        return acc + Number(item.preco) * Number(item.quantidade);
      },

      0,
    );

    this.total = this.subtotal + this.entrega;
  }

  finalizarPedido() {
    localStorage.setItem(
      'pedidoFinalizado',

      JSON.stringify(this.pedido),
    );

    localStorage.removeItem('carrinho');

    this.router.navigate(['/order-details']);
  }
}
