import connection from "./connection.js";


export async function salvarProduto(produto) {
    let comando = `
        INSERT INTO produto (categoria_id, nome, descricao, imagem, tamanho, preco)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [resposta] = await connection.query(comando, [
        produto.categoria_id,
        produto.nome,
        produto.descricao,
        produto.imagem,
        produto.tamanho,
        produto.preco
    ]);

    return resposta.insertId;
}


export async function listarProduto() {
    let comando = `
        SELECT 
            produto.id,
            produto.nome,
            produto.descricao,
            produto.imagem,
            produto.tamanho,
            produto.preco,
            categoria.nome AS categoria
        FROM produto
        INNER JOIN categoria ON produto.categoria_id = categoria.id
    `;

    const [linhas] = await connection.query(comando);

    return linhas;
}


export async function buscarProdutoPorId(id) {
    let comando = `
        SELECT 
            produto.id,
            produto.nome,
            produto.descricao,
            produto.imagem,
            produto.tamanho,
            produto.preco,
            categoria.nome AS categoria
        FROM produto
        INNER JOIN categoria ON produto.categoria_id = categoria.id
        WHERE produto.id = ?
    `;

    const [linhas] = await connection.query(comando, [id]);

    return linhas[0];
}


export async function alterarProduto(id, produto) {
    let comando = `
        UPDATE produto
        SET categoria_id = ?,
            nome = ?,
            descricao = ?,
            tamanho = ?,
            preco = ?
        WHERE id = ?
    `;

    const [resposta] = await connection.query(comando, [
        produto.categoria_id,
        produto.nome,
        produto.descricao,
        produto.tamanho,
        produto.preco,
        id
    ]);

    return resposta.affectedRows;
}


export async function deletarProduto(id) {
    let comando = `
        DELETE FROM produto
        WHERE id = ?
    `;

    const [resposta] = await connection.query(comando, [id]);

    return resposta.affectedRows;
}


export async function atualizarFotoPizza(id, caminho) {
    let comando = `
    UPDATE produto
    SET imagem = ?
    WHERE id = ?
    `

    const [resposta] = await connection.query(comando, [
        caminho,
        id
    ])

    return resposta.affectedRows;
}