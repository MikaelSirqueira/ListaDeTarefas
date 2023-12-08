import { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import AtividadeForm from './AtividadeForm';
import AtividadeLista from './AtividadeLista';
import api from '../../api/atividade';
import TitlePage from '../../components/TitlePage';
import { IAtividade, Prioridade } from '../../model/atividade';

const atividadeInicial: IAtividade = {
  id: 0,
  titulo: '',
  prioridade: Prioridade.NaoDefinido,
  descricao: '',
};

const Atividade = () => {
  const [atividades, setAtividades] = useState<IAtividade[]>([]);
  const [atividade, setAtividade] = useState<IAtividade>(atividadeInicial);
  const [showAtividadeModal, setShowAtividadeModal] = useState(false);
  const [modalExcluir, setModalExcluir] = useState(false);

  useEffect(() => {
    const getAtividades = async () => {
      const todasAtividades = await retornaTodasAtividades();
      if (todasAtividades) setAtividades(todasAtividades);
    };
    getAtividades();
  }, []);

  const retornaTodasAtividades = async () => {
    const response = await api.get('atividade');
    return response.data;
  };

  const adicionarAtividade = async (ativ: IAtividade) => {
    const response = await api.post('atividade', ativ);
    setAtividades([...atividades, response.data]);
    handleAtividadeModal();
  };

  const cancelarAtividade = () => {
    clearModalData();
  };

  const atualizarAtividade = async (ativ: IAtividade) => {
    const response = await api.put(`atividade/${ativ.id}`, ativ);
    const { id } = response.data;
    setAtividades(
      atividades.map((item) => (item.id === id ? response.data : item)),
    );
    clearModalData();
    handleAtividadeModal();
  };

  const editarAtividade = (id: number) => {
    const atividade = atividades.filter((atividade) => atividade.id === id);
    setAtividade(atividade[0]);
    handleAtividadeModal();
  };

  const clearModalData = () => {
    setAtividade(atividadeInicial);
    handleAtividadeModal();
  };

  const handleAtividadeModal = () => {
    setShowAtividadeModal(!showAtividadeModal);
  };

  const handleConfirmarModalExcluir = (id: number) => {
    if (id !== 0 && id !== undefined) {
      const atividade = atividades.filter((atividade) => atividade.id === id);
      setAtividade(atividade[0]);
    } else {
      setAtividade(atividadeInicial);
    }

    setModalExcluir(!modalExcluir);
  };

  const deletarAtividade = async (id: number) => {
    handleConfirmarModalExcluir(0);

    if (await api.delete(`atividade/${id}`)) {
      const atividadesFiltradas = atividades.filter(
        (atividade) => atividade.id !== id,
      );
      setAtividades([...atividadesFiltradas]);
    }
  };

  return (
    <>
      <TitlePage
        title={'Atividade ' + (atividade.id !== 0 ? atividade.id : '')}
      >
        <Button variant="outline-secondary" onClick={clearModalData}>
          <i className="fas fa-plus"></i>
        </Button>
      </TitlePage>

      <AtividadeLista
        atividades={atividades}
        handleConfirmarModalExcluir={handleConfirmarModalExcluir}
        editarAtividade={editarAtividade}
      />

      <Modal show={showAtividadeModal} onHide={handleAtividadeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            Atividade {atividade.id !== 0 ? atividade.id : ''}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AtividadeForm
            addAtividade={adicionarAtividade}
            cancelarAtividade={cancelarAtividade}
            atualizarAtividade={atualizarAtividade}
            ativSelecionada={atividade}
          />
        </Modal.Body>
      </Modal>

      <Modal
        size="sm"
        show={modalExcluir}
        onHide={() => handleConfirmarModalExcluir(0)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Excluir Atividade {atividade.id !== 0 ? atividade.id : ''}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir a atividade {atividade.id}
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <button
            className="btn btn-outline-success me-2"
            onClick={() => deletarAtividade(atividade.id)}
          >
            Sim
          </button>
          <button
            className="btn btn-danger me-2"
            onClick={() => handleConfirmarModalExcluir(0)}
          >
            Não
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Atividade;
