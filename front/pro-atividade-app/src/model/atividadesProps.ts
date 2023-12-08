import { IAtividade } from './atividade';

export interface AtividadeItemProps {
  ativ: IAtividade;
  editarAtividade: (id: number) => void;
  handleConfirmarModalExcluir: (id: number) => void;
}

export interface AtividadeListaProps {
  atividades: IAtividade[];
  editarAtividade: (id: number) => void;
  handleConfirmarModalExcluir: (id: number) => void;
}

export interface AtividadeFormProps {
  ativSelecionada: IAtividade;
  atualizarAtividade: (atividade: IAtividade) => void;
  addAtividade: (atividade: IAtividade) => void;
  cancelarAtividade: () => void;
}
