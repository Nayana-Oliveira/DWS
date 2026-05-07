import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-details.html',
  styleUrls: ['./order-details.css'],
})
export class OrderDetails implements OnInit {
  pedido: any[] = [];

  subtotal = 0;

  entrega = 8;

  total = 0;

  codigoSeguranca = '';

  numeroPedido = '';

  constructor(
    private router: Router,
    private change: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const dados = localStorage.getItem('pedidoFinalizado');

    console.log('PEDIDO:', dados);

    if (dados) {
      this.pedido = JSON.parse(dados);

      console.log(this.pedido);

      this.calcularTotal();

      this.gerarCodigo();

      this.gerarNumeroPedido();
    }

    this.change.detectChanges();
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

  gerarCodigo() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    let codigo = '';

    for (let i = 0; i < 6; i++) {
      codigo += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    this.codigoSeguranca = codigo;
  }

  gerarNumeroPedido() {
    this.numeroPedido = String(Math.floor(1000 + Math.random() * 9000));
  }

  cancelarPedido() {
    localStorage.removeItem('pedidoFinalizado');

    this.router.navigate(['/']);
  }

  pedirNovamente() {
    localStorage.setItem('carrinho', JSON.stringify(this.pedido));

    this.router.navigate(['/checkout']);
  }
}
