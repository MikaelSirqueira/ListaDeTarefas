import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import AtividadeForm from "./components/AtividadeForm";
import AtividadeLista from "./components/AtividadeLista";
import api from "./api/atividade";

function App() {
  const [atividades, setAtividades] = useState([]);
  const [atividade, setAtividade] = useState({ id: 0 });
  const [showAtividadeModal, setShowAtividadeModal] = useState(false);

  const handleAtividadeModal = () => {
    setShowAtividadeModal(!showAtividadeModal)
  };

  const retornaTodasAtividades = async () => {
    const response = await api.get("atividade");
    return response.data;
  };

  useEffect(() => {
    const getAtividades = async () => {
      const todasAtividades = await retornaTodasAtividades();
      if (todasAtividades) setAtividades(todasAtividades);
    };
    getAtividades();
  }, []);

  const adicionarAtividade = async (ativ) => {
    const response = await api.post("atividade", ativ);
    console.log('opa')
    setAtividades([...atividades, response.data]);
    handleAtividadeModal();
  };

  const cancelarAtividade = () => {
    clearModalData();    
  }

  const atualizarAtividade = async (ativ) => {
    const response = await api.put(`atividade/${ativ.id}`, ativ);
    const { id } = response.data;
    setAtividades(
      atividades.map((item) => (item.id === id ? response.data : item))
    );
    clearModalData();
    handleAtividadeModal();
  };

  const deletarAtividade = async (id) => {
    if (await api.delete(`atividade/${id}`)) {
      const atividadesFiltradas = atividades.filter(
        (atividade) => atividade.id !== id
      );
      setAtividades([...atividadesFiltradas]);
    }
  };

  const editarAtividade = (id) => {
    const atividade = atividades.filter((atividade) => atividade.id === id);
    setAtividade(atividade[0]);
    handleAtividadeModal();
  }

  const clearModalData = () => {
    setAtividade({ id: 0 });
    handleAtividadeModal();
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-end mt-2 pb-3 border-bottom border-1">
        <h1 className="m-0 p-0">
          Atividade {atividade.id !== 0 ? atividade.id : ""}
        </h1>
        <Button variant="outline-secondary" onClick={clearModalData}>
          <i className="fas fa-plus"></i>
        </Button>
      </div>

      <AtividadeLista
        atividades={atividades}
        deletarAtividade={deletarAtividade}
        editarAtividade={editarAtividade}
      />

      <Modal show={showAtividadeModal} onHide={handleAtividadeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            Atividade {atividade.id !== 0 ? atividade.id : ""}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AtividadeForm
            addAtividade={adicionarAtividade}
            cancelarAtividade={cancelarAtividade}
            atualizarAtividade={atualizarAtividade}
            ativSelecionada={atividade}
            atividades={atividades}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default App;
