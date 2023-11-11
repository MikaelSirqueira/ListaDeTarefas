import React from "react";

export default function Atividades(props) {
  function prioridadeLabel(param) {
    switch (param) {
      case 'Baixa':
        return 'Baixa'
      case 'Normal':
        return 'Normal'
      case 'Alta':
        return 'Alta'
      default:
        return "Não definido";
    }
  }

  function prioridadeStyle(param, icon) {
    switch (param) {
      case  "Baixa":
        return icon ? "fa-smile" : "success";
      case  "Normal":
        return icon ? "fa-meh" : "warning";
      case "Alta":
        return icon ? "fa-frown" : "danger";
      default:
        return "fa-face-meh-blank";
    }
  }

  return (
    <>
      <div
        className={
          "card mb-2 shadow-sm border-" + prioridadeStyle(props.ativ.prioridade)
        }
      >
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title">
              <span className="badge bg-secondary me-1">{props.ativ.id}</span>-{" "}
              {props.ativ.titulo}
            </h5>

            <h6>
              Prioridade:
              <span
                className={
                  "ms-1 text-" + prioridadeStyle(props.ativ.prioridade)
                }
              >
                <i
                  className={
                    "me-1 far " + prioridadeStyle(props.ativ.prioridade, true)
                  }
                ></i>
                {prioridadeLabel(props.ativ.prioridade)}
              </span>
            </h6>
          </div>

          <p className="card-text">{props.ativ.descricao}</p>

          <div className="d-flex justify-content-end border-top pt-2 m-0">
            <button
              className="btn btn-sm btn-outline-primary me-2"
              onClick={() => props.editarAtividade(props.ativ.id)}
            >
              <i className="fas fa-pen me-2"></i>
              Editar
            </button>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => props.deletarAtividade(props.ativ.id)}
            >
              <i className="fas fa-trash me-2"></i>
              Deletar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
