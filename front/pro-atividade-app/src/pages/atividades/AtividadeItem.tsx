import React from 'react';
import { AtividadeItemProps } from '../../model/atividadesProps';
import { Prioridade } from '../../model/atividade';

const AtividadeItem: React.FC<AtividadeItemProps> = ({
  ativ,
  editarAtividade,
  handleConfirmarModalExcluir,
}: AtividadeItemProps) => {
  function prioridadeLabel(param: string) {
    switch (param) {
      case Prioridade.Baixa:
      case Prioridade.Normal:
      case Prioridade.Alta:
        return param;
      default:
        return Prioridade.NaoDefinido;
    }
  }

  function prioridadeStyle(param: string, icon: boolean) {
    switch (param) {
      case 'Baixa':
        return icon ? 'fa-smile' : 'success';
      case 'Normal':
        return icon ? 'fa-meh' : 'warning';
      case 'Alta':
        return icon ? 'fa-frown' : 'danger';
      default:
        return 'fa-face-meh-blank';
    }
  }

  return (
    <>
      <div
        className={
          'card mb-2 shadow-sm border-' +
          prioridadeStyle(ativ.prioridade, false)
        }
      >
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title">
              <span className="badge bg-secondary me-1">{ativ.id}</span>-{' '}
              {ativ.titulo}
            </h5>

            <h6>
              Prioridade:
              <span
                className={
                  'ms-1 text-' + prioridadeStyle(ativ.prioridade, false)
                }
              >
                <i
                  className={
                    'me-1 far ' + prioridadeStyle(ativ.prioridade, true)
                  }
                ></i>
                {prioridadeLabel(ativ.prioridade)}
              </span>
            </h6>
          </div>

          <p className="card-text">{ativ.descricao}</p>

          <div className="d-flex justify-content-end border-top pt-2 m-0">
            <button
              className="btn btn-sm btn-outline-primary me-2"
              onClick={() => editarAtividade(ativ.id)}
            >
              <i className="fas fa-pen me-2"></i>
              Editar
            </button>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => handleConfirmarModalExcluir(ativ.id)}
            >
              <i className="fas fa-trash me-2"></i>
              Deletar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AtividadeItem;
