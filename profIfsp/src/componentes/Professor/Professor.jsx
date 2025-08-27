import React from "react";
import "./Professor.css";
const Professor = ({ nome, imagem, titulo }) => {
  return (
    <div className="colaborador">
      <div className="cabecalho">
        <img src={imagem} alt={nome} />
      </div>
      <div className="rodape">
        <h4>{nome}</h4>
        <h5>{titulo}</h5>
      </div>
    </div>
  );
};
export default Professor;
