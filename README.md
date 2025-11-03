# Simulador de Compras - Sistema de Gerenciamento

## Descrição do Projeto

Sistema web para simulação de compras que permite cadastrar pessoas e produtos, atribuir compras a usuários e calcular totais gastos. Desenvolvido com HTML, CSS e JavaScript puro, utilizando localStorage para persistência de dados.

## Funcionalidades Principais

### Gestão de Pessoas
- Cadastro de pessoas com nome
- Listagem de pessoas cadastradas
- Cálculo automático do total gasto por pessoa
- Remoção de pessoas

### Gestão de Produtos
- Cadastro de produtos com nome e preço
- Edição de preços dos produtos
- Aumento/diminuição de preço em R$1,00
- Remoção de produtos

### Sistema de Compras
- Atribuição de produtos a pessoas
- Visualização de produtos por pessoa
- Cálculo automático do total de compras
- Interface intuitiva com seleção via dropdown

## Tecnologias Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Armazenamento:** localStorage
- **Layout:** CSS Grid e Flexbox
- **Design:** Responsivo e moderno

## Estrutura do Projeto

```
projeto-simulador-compras/
├── index.html          # Estrutura principal da aplicação
├── style.css           # Estilos e design responsivo
└── script.js           # Lógica da aplicação e manipulação de dados
```

## Características Técnicas

### Persistência de Dados
- Dados salvos automaticamente no localStorage
- Recuperação de dados ao recarregar a página
- IDs sequenciais para pessoas e produtos

### Validações
- Campos obrigatórios em formulários
- Validação de preços (não negativos)
- Prevenção de duplicação de produtos por pessoa

## Estrutura de Dados

### Pessoa
```javascript
{
  id: number,
  nome: string,
  produtos: number[] // IDs dos produtos
}
```

### Produto
```javascript
{
  id: number,
  nome: string,
  preco: number
}
```
