const { func } = require('../infra/conection')
const ima_database = require('../../knexfile')

exports.getProdutos = function () {
  return ima_database.query('SELECT * FROM produto')
}

exports.insertNovoProduto = function (produto) {
  ima_database.none(
    'INSERT INTO produto (descricao, preco, id_tipo_produto) VALUES  ($1, $2, $3)',
    [produto.descricao, produto.preco, produto.tipo_produto]
  )
}
