import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdutoService } from '../../services/produto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarrinhoService } from '../../services/carrinho';

@Component({
  selector: 'app-detalhe-pedido',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detalhe-pedido.html',
  styleUrl: './detalhe-pedido.css',
})
export class DetalhePedido implements OnInit {
  produto: any = null;

  quantidade = 1;

  obs = '';

  carregando = true;

  constructor(
    private route: ActivatedRoute,
    private service: ProdutoService,
    private carrinhoService: CarrinhoService,
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.service.buscarPorId(id).subscribe({
      next: (res: any) => {
        this.produto = {
          ...res,

          imagem: `http://localhost:5010/${res.imagem}`,
        };

        this.carregando = false;
      },

      error: (err: any) => {
        console.error(err);

        this.carregando = false;
      },
    });
  }

  aumentar() {
    this.quantidade++;
  }

  diminuir() {
    if (this.quantidade > 1) {
      this.quantidade--;
    }
  }

  get total() {
    return Number(this.produto?.preco || 0) * this.quantidade;
  }

  adicionarCarrinho() {
    this.carrinhoService.adicionar(this.produto.id).subscribe({
      next: () => {
        alert('Produto adicionado ao carrinho');
      },

      error: (err: any) => {
        console.error(err);
      },
    });
  }
}
