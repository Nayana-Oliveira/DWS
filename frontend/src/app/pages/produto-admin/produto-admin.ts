import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { ProdutoService } from '../../services/produto';

@Component({
  selector: 'app-produto-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './produto-admin.html',
  styleUrl: './produto-admin.css',
})
export class ProdutoAdmin implements OnInit {
  nome = '';

  descricao = '';

  preco = 0;

  categoria_id = '';

  tamanho = 'M';

  imagem!: File;

  previewImagem = '';

  categorias: any[] = [];

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.carregarCategorias();
  }

  carregarCategorias() {
    this.produtoService.listarCategorias().subscribe({
      next: (res: any) => {
        this.categorias = res;
      },

      error: (err: any) => {
        console.error(err);
      },
    });
  }

  selecionarImagem(event: any) {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    this.imagem = file;

    const reader = new FileReader();

    reader.onload = () => {
      this.previewImagem = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  selecionarTamanho(tamanho: string) {
    this.tamanho = tamanho;
  }

  salvarProduto() {
    if (
      !this.nome ||
      !this.descricao ||
      !this.preco ||
      !this.categoria_id ||
      !this.tamanho ||
      !this.imagem
    ) {
      alert('Preencha todos os campos.');

      return;
    }

    const formData = new FormData();

    formData.append('nome', this.nome);

    formData.append('descricao', this.descricao);

    formData.append('preco', String(this.preco));

    formData.append('categoria_id', this.categoria_id);

    formData.append('tamanho', this.tamanho);

    formData.append('imagem', this.imagem);

    this.produtoService.salvar(formData).subscribe({
      next: () => {
        alert('Produto cadastrado!');

        this.router.navigate(['/admin/dashboard']);
      },

      error: (err: any) => {
        console.error(err);

        alert('Erro ao cadastrar produto');
      },
    });
  }
}
