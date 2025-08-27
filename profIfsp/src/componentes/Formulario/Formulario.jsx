import React, { useState } from "react";
import "./Formulario.css";
import CampoTexto from "../CampoTexto/CampoTexto";
import ListaSuspensa from "../ListaSuspensa/ListaSuspensa";
import Botao from "../Botao/Botao";

const Formulario = (props) => {
  // Criando os estados...
  const [nome, setNome] = useState("");
  const [titulo, setTitulo] = useState("");
  const [imagem, setImagem] = useState("");
  const [area, setArea] = useState("Progr. Básica");

  const aoSalvar = (evento) => {
    evento.preventDefault();
    //console.log('Form foi submetido => ', nome, titulo, imagem, area)
    props.aoProfCadastrado({
      nome: nome,
      titulo: titulo,
      imagem: imagem,
      area: area,
    });
    setNome("");
    setTitulo("");
    setImagem("");
    setArea("");
  };

  return (
    <section className="formulario">
      <form onSubmit={aoSalvar}>
        <h2>Dados do professor:</h2>

        <CampoTexto
          label="Nome"
          placeholder="Digite seu nome"
          valor={nome}
          aoAlterado={(valor) => setNome(valor)}
        />

        <CampoTexto
          label="Título"
          placeholder="Digite seu título"
          valor={titulo}
          aoAlterado={(valor) => setTitulo(valor)}
        />

        <CampoTexto
          label="Imagem"
          placeholder="Digite o endereço da imagem"
          valor={imagem}
          aoAlterado={(valor) => setImagem(valor)}
        />

        <ListaSuspensa
          label="Áreas"
          itens={props.areas}
          aoAlterado={(valor) => setArea(valor)}
        />

        <Botao>Criar Professor</Botao>
      </form>
    </section>
  );
};

export default Formulario;
