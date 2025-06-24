// Dados iniciais
let pessoas = JSON.parse(localStorage.getItem("pessoas")) || [
  { id: 1, nome: "Carolina", produtos: [] }, 
  { id: 2, nome: "Otávio", produtos: [] }, 
];

let produtos = JSON.parse(localStorage.getItem("produtos")) || [
  { id: 1, nome: "Monitor", preco: 10 }, 
  { id: 2, nome: "Teclado", preco: 2.5 }, 
];

let proximaPessoaId = Math.max(0, ...pessoas.map((p) => p.id)) + 1; 
let proximoProdutoId = Math.max(0, ...produtos.map((p) => p.id)) + 1; 

// Função para salvar os dados no localStorage
function salvarDados() {
  localStorage.setItem("pessoas", JSON.stringify(pessoas)); 
  localStorage.setItem("produtos", JSON.stringify(produtos)); 
}

// Utilidades para atualizar as listas na tela
function atualizarListas() {
  const listaPessoas = document.getElementById("listaPessoas"); // Obtém o elemento da lista de pessoas
  const listaProdutos = document.getElementById("listaProdutos"); // Obtém o elemento da lista de produtos
  const selectPessoa = document.getElementById("selectPessoa"); // Obtém o select para escolher pessoas
  const selectProduto = document.getElementById("selectProduto"); // Obtém o select para escolher produtos

  listaPessoas.innerHTML = ""; // Limpa a lista de pessoas 
  listaProdutos.innerHTML = ""; // Limpa a lista de produtos 
  selectPessoa.innerHTML = '<option value="">Selecione uma pessoa</option>'; // Adiciona a opção inicial ao select de pessoas
  selectProduto.innerHTML = '<option value="">Selecione um produto</option>'; // Adiciona a opção inicial ao select de produtos

  // Atualiza a lista de pessoas
  pessoas.forEach((pessoa) => {
    // Calcula o total das compras de cada pessoa somando os preços dos produtos atribuídos a ela
    const totalCompras = pessoa.produtos.reduce((soma, prod) => {
      const produto = produtos.find((p) => p.id === prod); // Encontra o produto correspondente ao ID
      return soma + (produto ? produto.preco : 0); // Soma o preço do produto ou 0 se não encontrado
    }, 0);

    // Cria um cartão de informação para a pessoa
    const card = document.createElement("div");
    card.classList.add("card"); 
    card.innerHTML = `
      <strong>${pessoa.nome}</strong>
      <br>Produtos: ${
        pessoa.produtos
          .map((id) => {
            const produto = produtos.find((p) => p.id === id);
            return produto ? produto.nome : "";
          })
          .join(", ") || "Nenhum"
      }
      <br>Total: R$ ${totalCompras.toFixed(2)}
      <br><button onclick="removerPessoa(${pessoa.id})">Remover Pessoa</button>
    `; // Preenche o cartão com os dados da pessoa, incluindo nome, produtos e total
    listaPessoas.appendChild(card); 

    const option = document.createElement("option");
    option.value = pessoa.id;
    option.textContent = pessoa.nome;
    selectPessoa.appendChild(option);
  });

  // Atualiza a lista de produtos
  produtos.forEach((produto) => {
    // Cria um cartão de informação para o produto
    const card = document.createElement("div");
    card.classList.add("card"); 
    card.innerHTML = `
      <strong>${produto.nome}</strong> Preço: R$ ${produto.preco.toFixed(2)}<br>
      <button onclick="alterarPreco(${produto.id}, 'aumentar')">+ R$1</button>
      <button onclick="alterarPreco(${produto.id}, 'diminuir')">- R$1</button>
      <button onclick="editarProduto(${produto.id})">Editar</button>
      <button onclick="removerProduto(${produto.id})">Remover</button>
    `; // Preenche o cartão com os dados do produto, incluindo nome, preço e botões de ação
    listaProdutos.appendChild(card); // Adiciona o cartão à lista de produtos

    // Adiciona o produto ao select de produtos
    const option = document.createElement("option");
    option.value = produto.id;
    option.textContent = `${produto.nome} - R$ ${produto.preco.toFixed(2)}`;
    selectProduto.appendChild(option);
  });

  salvarDados(); 
}

// Função para cadastrar uma nova pessoa
function cadastrarPessoa() {
  const nome = document.getElementById("nomePessoa").value.trim(); 
  if (!nome) {
    alert("Nome da pessoa não pode ser vazio.");
    return;
  }
  pessoas.push({ id: proximaPessoaId++, nome, produtos: [] }); // Adiciona a nova pessoa à lista
  document.getElementById("nomePessoa").value = ""; 
  atualizarListas(); 
}

// Função para cadastrar um novo produto
function cadastrarProduto() {
  const nome = document.getElementById("nomeProduto").value.trim(); 
  const preco = parseFloat(document.getElementById("precoProduto").value); 

  if (!nome) {
    alert("Nome do produto não pode ser vazio."); 
    return;
  }
  if (isNaN(preco) || preco < 0) {
    alert("O preço deve ser zero ou maior."); 
    return;
  }

  produtos.push({ id: proximoProdutoId++, nome, preco }); // Adiciona o novo produto à lista
  document.getElementById("nomeProduto").value = ""; 
  document.getElementById("precoProduto").value = ""; 
  atualizarListas(); 
}

// Função para atribuir um produto a uma pessoa
function atribuirProduto() {
  const idPessoa = parseInt(document.getElementById("selectPessoa").value); 
  const idProduto = parseInt(document.getElementById("selectProduto").value); 

  if (isNaN(idPessoa) || isNaN(idProduto)) {
    alert("Você precisa selecionar uma pessoa e um produto."); 
    return;
  }

  const pessoa = pessoas.find((p) => p.id === idPessoa); 
  if (!pessoa.produtos.includes(idProduto)) {
    pessoa.produtos.push(idProduto); // Adiciona o produto à lista de produtos da pessoa
    atualizarListas(); 
  } else {
    alert("Essa pessoa já possui esse produto."); 
  }
}

// Função para remover um produto
function removerProduto(idProduto) {
  produtos = produtos.filter((p) => p.id !== idProduto); // Remove o produto da lista de produtos
  pessoas.forEach((pessoa) => {
    pessoa.produtos = pessoa.produtos.filter((pid) => pid !== idProduto); // Remove o produto das pessoas que o possuíam
  });
  atualizarListas(); 
}

// Função para editar o preço de um produto
function editarProduto(idProduto) {
  const produto = produtos.find((p) => p.id === idProduto); 
  const novoPreco = parseFloat(
    prompt(`Novo preço para ${produto.nome}:`, produto.preco)
  ); 
  if (!isNaN(novoPreco) && novoPreco >= 0) {
    produto.preco = novoPreco; // Atualiza o preço do produto
    atualizarListas(); 
  } else {
    alert("Preço inválido."); 
  }
}

// Função para aumentar ou diminuir o preço de um produto
function alterarPreco(idProduto, operacao) {
  const produto = produtos.find((p) => p.id === idProduto); 
  if (!produto) return; 
  if (operacao === "aumentar") produto.preco += 1; // Se a operação for 'aumentar', adiciona 1 ao preço
  if (operacao === "diminuir" && produto.preco >= 1) produto.preco -= 1; // Se a operação for 'diminuir', subtrai 1 ao preço
  atualizarListas(); 
}

// Função para remover uma pessoa
function removerPessoa(idPessoa) {
  pessoas = pessoas.filter((p) => p.id !== idPessoa); 
  atualizarListas(); 
}

// Inicializa ao carregar a página
window.onload = () => {
  atualizarListas(); 

  // Configura os listeners para os formulários
  document.getElementById("formPessoa").addEventListener("submit", (e) => {
    e.preventDefault(); // Previne o comportamento padrão de submit
    cadastrarPessoa(); 
  });

  document.getElementById("formProduto").addEventListener("submit", (e) => {
    e.preventDefault(); 
    cadastrarProduto(); 
  });

  document.getElementById("formAtribuir").addEventListener("submit", (e) => {
    e.preventDefault(); 
    atribuirProduto(); 
  });
};
