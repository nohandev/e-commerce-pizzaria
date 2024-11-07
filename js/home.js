const images = [
  'img/img-carrossel/carrossel1.jpg',
  'img/img-carrossel/carrossel2.jpg',
  'img/img-carrossel/carrossel3.jpg'
];

let currentIndex = 0;

const imgElement = document.getElementById('carrossel-image');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');

function updateImage() {
  imgElement.src = images[currentIndex];
}

function showNextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  updateImage();
}

function showPrevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateImage();
}

nextButton.addEventListener('click', showNextImage);
prevButton.addEventListener('click', showPrevImage);

setInterval(showNextImage, 3000);

updateImage();

//key do modal

let modalKey = 0;

//quantidade de pizzas na jalena modal

let quantidadePizzas = 1;

//Queridissímo carrinho 

let cart = [];

//Função auxiliar
const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);

const formatoReal = (valor) => {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const abrirModal = () => {
  select('.pizzaWindowArea').style.opacity = 0;
  select('.pizzaWindowArea').style.display = 'flex';
  setTimeout(() => {
    select('.pizzaWindowArea').style.opacity = 1;
  }, 80)
};

const fecharModal = () => {
  select('.pizzaWindowArea').style.opacity = 1;
  select('.pizzaWindowArea').style.display = 'none';
  setTimeout(() => {
    select('.pizzaWindowArea').style.opacity = 0;
  }, 80)
};

const preencherDadosPizza = (pizzaItem, item, index) => {
  pizzaItem.setAttribute('data-key', index);
  pizzaItem.querySelector('.pizza-item--img img').src = item.img;
  pizzaItem.querySelector('.pizza-item--name').innerHTML = `<p>- ${item.name}</p>`;
  pizzaItem.querySelector('.pizza-item--price').innerHTML = `<p>- ${formatoReal(item.price[1])}</p>`;
  pizzaItem.querySelector('.pizza-item--desc').innerHTML = `<p>- ${item.description}</p>`;
};

const preencherDadosModal = (item) => {
  select('.pizzaBig img').src = item.img;
  select('.pizzaInfo h1').innerHTML = `<p>${item.name}</p>`;
  select('.pizzaInfo--desc').innerHTML = `<p>${item.description}</p>`;
  select('.pizzaInfo--actualPrice').innerHTML = `<p>${formatoReal(item.price[2])}</p>`;
};

const pegarKey = (e) => {
  // .closest retorna o elemento mais proximo que tem a class que passamos
  // do .pizza-item ele vai pegar o valor do atributo data-key
  let key = e.target.closest('.pizza-item').getAttribute('data-key')
 
  // garantir que a quantidade inicial de pizzas é 1
  quantidadePizzas = 1

  // Para manter a informação de qual pizza foi clicada
  modalKey = key

  return key
}

const preencherTamanhos = (key) => { 
  // tirar a selecao de tamanho atual e selectr o tamanho grande
  select('.pizzaInfo--size.selected').classList.remove('selected')

  // selectr todos os tamanhos
  selectAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
      // selectr o tamanho grande
      (sizeIndex == 2) ? size.classList.add('selected') : ''
      size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
      select('.pizzaInfo--actualPrice').innerHTML = formatoReal(pizzaJson[key].price[sizeIndex])
  })
}

const escolherTamanhoPreco = (key) => {
  // Ações nos botões de tamanho
  // selectr todos os tamanhos
      selectAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
      size.addEventListener('click', () => {
          // clicou em um item, tirar a selecao dos outros e marca o q vc clicou
          // tirar a selecao de tamanho atual e select o tamanho grande
          select('.pizzaInfo--size.selected').classList.remove('selected')
          // marcar o que vc clicou, ao inves de usar e.target use size, pois ele é nosso item dentro do loop
          size.classList.add('selected')

          // mudar o preço de acordo com o tamanho
           select('.pizzaInfo--actualPrice').innerHTML = formatoReal(pizzaJson[key].price[sizeIndex])
      })
  })
}

const mudarQuantidade = () => {
  // Ações nos botões + e - da janela modal
  select('.pizzaInfo--qtmais').addEventListener('click', () => {
      
      quantidadePizzas++
      select('.pizzaInfo--qt').innerHTML = quantidadePizzas
  })

  select('.pizzaInfo--qtmenos').addEventListener('click', () => {
      if(quantidadePizzas > 1) {
          quantidadePizzas--
          select('.pizzaInfo--qt').innerHTML = quantidadePizzas	
      }
  })
}


const adicionarNoCarrinho = () => {
  select('.pizzaInfo--addButton').addEventListener('click', () => {
    console.log('adicionou ao carrinho')
      // pegar dados da janela modal atual
    // qual pizza? pegue o modalKey para usar pizzaJson[modalKey]
    console.log("Pizza " + modalKey)
    // tamanho
    let size = select('.pizzaInfo--size.selected').getAttribute('data-key')
    console.log("Tamanho " + size)
    // quantidade
    console.log("Quant. " + quantidadePizzas)
      // preco
      let price = select('.pizzaInfo--actualPrice').innerHTML.replace('R$&nbsp;', '')
  
      // crie um identificador que junte id e tamanho
    // concatene as duas informacoes separadas por um símbolo, vc escolhe
    let identificador = `${pizzaJson[modalKey].id} Tamanho: ${size}`

      // antes de adicionar verifique se ja tem aquele codigo e tamanho
      // para adicionarmos a quantidade
      let key = cart.findIndex( (item) => item.identificador == identificador )

      console.log(key)

      if(key > -1) {
          // se encontrar aumente a quantidade
          cart[key].qt += quantidadePizzas
      } else {
          // adicionar objeto pizza no carrinho
          let pizza = {
              identificador,
              id: pizzaJson[modalKey].id,
              size, // size: size
              qt: quantidadePizzas,
              price: parseFloat(price) // price: price
          }
          cart.push(pizza)
          console.log(pizza)
          console.log('Sub total R$ ' + (pizza.qt * pizza.price).toFixed(2))
          console.log(cart)

      }
      fecharModal()
      abrirCarrinho()
      atualizarCarrinho()
  })
}

const abrirCarrinho = () => {
  if(cart.length > 0) {
      // mostrar o carrinho
    select('aside').classList.add('show')
  }
}

select('#carrinho-btn').addEventListener('click', () => {
  select('aside').classList.add('show')
})

const fecharCarrinho = () => {
  
  select('.cart--fechar').addEventListener('click', () => {
    select('aside').classList.remove('show')
  })
}

const atualizarCarrinho = () => {
  // exibir número de itens no carrinho
  select('.cart-notificacao').innerHTML = cart.length
  

// mostrar ou nao o carrinho
if(cart.length > 0) {

  // mostrar o carrinho
  select('aside').classList.add('show')
  select('.cart-notificacao').classList.add('show')

  // zerar meu .cart para nao fazer insercoes duplicadas
  select('.cart').innerHTML = ''

      // crie as variaveis antes do for
  let subtotal = 0
  let desconto = 0
  let total    = 0

      // para preencher os itens do carrinho, calcular subtotal
  for(let i in cart) {
    // use o find para pegar o item por id
    let pizzaItem = pizzaJson.find( (item) => item.id == cart[i].id )
    console.log(pizzaItem)

    // em cada item pegar o subtotal
    subtotal += cart[i].price * cart[i].qt
    //console.log(cart[i].price)

    // fazer o clone, exibir na telas e depois preencher as informacoes
    let cartItem = select('.models .cart--item').cloneNode(true)
    select('.cart').append(cartItem)

    let pizzaSizeName = cart[i].size

    let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`

    // preencher as informacoes
    cartItem.querySelector('img').src = pizzaItem.img
    cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName
    cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt

    // seleciona botoes + e -
    cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
      console.log('Clicou no botão mais')
      // adicionar apenas a quantidade que esta neste contexto
      cart[i].qt++
      // atualizar a quantidade
      atualizarCarrinho()
    })

    cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
      console.log('Clicou no botão menos')
      if(cart[i].qt > 1) {
        // subtrair apenas a quantidade que esta neste contexto
        cart[i].qt--
      } else {
        // remover se for zero
        cart.splice(i, 1)
        select('.cart').remove(cartItem)
        select('.subtotal span:last-child').innerHTML = `R$ 00,00`
        select('.desconto span:last-child').innerHTML = `R$ 00,00`
        select('.total span:last-child').innerHTML = `R$ 00,00`
      }

     (cart.length < 1) ? select('aside').classList.remove('show') : ''

      // atualizar a quantidade
      atualizarCarrinho()
    })

    select('.cart').append(cartItem)

  } // fim do for

  // fora do for
  // calcule desconto 10% e total
  //desconto = subtotal * 0.1
  desconto = subtotal * 0
  total = subtotal - desconto

  // exibir na tela os resultados
  // selectr o ultimo span do elemento
  select('.subtotal span:last-child').innerHTML = formatoReal(subtotal)
  select('.desconto span:last-child').innerHTML = formatoReal(desconto)
  select('.total span:last-child').innerHTML = formatoReal(total)

} else {
  // ocultar o carrinho
  select('aside').classList.remove('show')
  select('.cart-notificacao').classList.remove('show')
}
}


//mapear no pizzaJson, preencer os dados e colocar na div.pizza-area
pizzaJson.map((item, index) => {
  let pizzaItem = document.querySelector(".pizza-item").cloneNode(true);
  select('.pizza-area').append(pizzaItem);
  preencherDadosPizza(pizzaItem, item, index);

// Abrir Modal
  pizzaItem.querySelector('.pizza-item--btn').addEventListener('click', (e) => {
    
    let chave = pegarKey(e)

    abrirModal();

    preencherDadosModal(item);

    preencherTamanhos(chave)

    select('.pizzaInfo--qt').innerHTML = quantidadePizzas

    escolherTamanhoPreco(chave)

  });

//Fechar Modal
  document.querySelector('.pizzaInfo--cancelButton'). addEventListener('click', () => {
    fecharModal();
  });
});

mudarQuantidade();
adicionarNoCarrinho()
atualizarCarrinho()
fecharCarrinho()