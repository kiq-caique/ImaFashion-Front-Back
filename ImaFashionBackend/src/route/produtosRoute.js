const express = require("express");
const { mandarMensagem } = require("../twilio");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

let shoppingCar = [];
let pedidos = [];

console.log(shoppingCar);

router.get("/", (req, res) => {
  res.send("imafashion");
});

function totalCart() {
  return shoppingCar.reduce((prev, current) => prev + (current.quantity * current.price), 0);
}

router.post("/carrinhodecompras", (req, res) => {
  const { name, code, price, quantity, size } = req.body;

  const produtoExistente = shoppingCar.find((produto) => produto.code === code);

  if (produtoExistente) {
    shoppingCar = shoppingCar.map((produto) => {
      if (produto.code === produtoExistente.code) {
        return {
          ...produtoExistente,
          quantity: quantity + produtoExistente.quantity,
        };
      }
      return produto;
    });
  } else {
    shoppingCar.push({
      id: uuidv4(),
      name,
      code,
      price,
      quantity,
      size,
    });
  }
  return res.status(201).send("Produto adicionado ao carrinho!");
});

router.get("/carrinhodecompras", (req, res) => {
  res.json(shoppingCar);
});

router.get("/carrinhodecompras/:code", (req, res) => {
  const code = req.params.code;
  const findProduct = shoppingCar.find((produto) => produto.code === code);

  res.json(findProduct);
});

router.put("/carrinhodecompras/addProduct/:code", (req, res) => {
  const code = req.params.code;

  const findProduct = shoppingCar.find((produto) => produto.code === code);

  findProduct.quantity++;

  return res.json(shoppingCar);
});

router.put("/carrinhodecompras/removeProduct/:code", (req, res) => {
  const code = req.params.code;

  const findProduct = shoppingCar.find((produto) => produto.code === code);

  findProduct.quantity--;

  return res.json(shoppingCar);
});

router.delete("/carrinhodecompras/:code", (req, res) => {
  const code = req.params.code;
  const findIndex = shoppingCar.findIndex((produto) => produto.code === code);

  shoppingCar.splice(findIndex, 1);

  return res.status(201).send("Produto removido com sucesso!");
});

router.post("/comprar", (req, res) => {
  const { email, endereco, frete, freteValue, tipoPagamento } = req.body;
  // salvar pedido...
  const pedido = {
    id: uuidv4(),
    email,
    endereco,
    frete,
    freteValue: freteValue,
    tipoPagamento,
    total: freteValue + totalCart(),
    cart: [...shoppingCar],
  };
  pedidos.push(pedido);
  // mandar mensagem
  mandarMensagem(`
    Pedido feito com sucesso! N: ${pedido.id}

    Email: ${pedido.email}.
    Endereço: ${pedido.endereco}.
    Frete: ${pedido.frete}.
    Valor do frete: ${pedido.freteValue}
    Valor: ${pedido.total}.
    Pagamento: ${pedido.tipoPagamento}.

    Produtos: ${shoppingCar.map(produto => `
      Produto: ${produto.name}.
      Quantidade: ${produto.quantity}.
      Tamanho: ${produto.size}.
      Preço: ${produto.price}.
    `).join('\n')}
  `).then(console.log).catch(console.log);

  // apagar carrinho
  shoppingCar = [];

  // mandar ok
  return res.status(200).send('boa compras!');
});

module.exports = router;
