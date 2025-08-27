import React from "react";
import "./Lista.css";

const Lista = (props) => {
  return (
    <div className="lista">
      <h2>Lista de Professores</h2>

      {
        // Usa o método map para iterar sobre cada elemento do array props.objetos.
        // Para cada elemento, uma função é executada que recebe dois parâmetros:
        // - objeto: o elemento atual do array
        // - index: o índice do elemento atual no array
        //
        // O resultado deste map é um array de elementos JSX,
        // que o React renderiza como uma lista de professores na interface do usuário.
      }

      {props.objetos.map((objeto, index) => (
        // Para cada objeto no array, o código gera um bloco de JSX.
        // Cada bloco é envolvido por uma <div> com uma key única (usando o index).
        // Isso ajuda o React a identificar quais itens mudaram,
        // foram adicionados ou removidos.

        <div key={index}>
          <strong>Nome:</strong> {objeto.titulo} {objeto.nome} ({objeto.area})
          <br />
          <strong>Imagem:</strong> {objeto.imagem}
          <br />
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Lista;
