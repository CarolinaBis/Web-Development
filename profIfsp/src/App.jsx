import React, { useState } from "react";
import Banner from "./componentes/Banner/Banner";
import Formulario from "./componentes/Formulario/Formulario";
import Area from "./componentes/Area/Area";

function App() {
  const areas = [
    {
      nome: "Progr. Básica",
      corPrimaria: "#57c278",
      corSecundaria: "#d9f7e9",
    },
    {
      nome: "Progr. Web",
      corPrimaria: "#82cffa",
      corSecundaria: "#e8f8ff",
    },
    {
      nome: "Banco de Dados",
      corPrimaria: "#a6d157",
      corSecundaria: "#f0f8e2",
    },
    {
      nome: "Diversos",
      corPrimaria: "#e06b69",
      corSecundaria: "#fde7e8",
    },
  ];

  // Criando uma lista só com os nomes das áreas:
  const listaAreas = areas.map((area) => area.nome);

  // lista (array) de professores.
  // o valor inicial é um array vazio []
  const [professores, setProfessores] = useState([]);

  const adicionaProf = (prof) => {
    // criando uma nova lista com o conteúdo anterior da lista.
    //
    // CUIDADO!!! não vá fazer listaNova = professores,
    // isso não criará uma nova lista, apenas criará uma nova
    // referência (ponteiro) para a mesma lista (o mesmo objeto).
    //
    // O método slice() de um array em JavaScript
    // retorna uma cópia superficial de uma porção de um array
    // dentro de um novo array objeto selecionado desde start
    // até end (end não é incluído).
    // Se não passarmos nenhum argumento para slice(),
    // ele retorna uma cópia do array inteiro.
    const listaNova = professores.slice();

    // adicionando o novo professor nesssa lista:
    listaNova.push(prof);

    // colocando a nova lista atualizada no estado:
    setProfessores(listaNova);
  };

  return (
    <div>
      <Banner />
      <Formulario
        areas={listaAreas}
        aoProfCadastrado={(prof) => adicionaProf(prof)}
      />

      {areas.map((area) => (
        <Area
          key={area.nome}
          nome={area.nome}
          corPrimaria={area.corPrimaria}
          corSecundaria={area.corSecundaria}
          professores={professores.filter((prof) => prof.area === area.nome)}
        />
      ))}
    </div>
  );
}

export default App;
