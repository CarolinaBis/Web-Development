import React from "react";
import "./ListaSuspensa.css";

const ListaSuspensa = (props) => {
  const aoEscolhido = (evento) => {
    props.aoAlterado(evento.target.value);
  };

  return (
    <div className="lista-suspensa">
      <label>{props.label}</label>
      <select onChange={aoEscolhido}>
        {props.itens.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
    </div>
  );
};

export default ListaSuspensa;
