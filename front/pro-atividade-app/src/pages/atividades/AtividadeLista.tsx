import { AtividadeListaProps } from '../../model/atividadesProps';
import AtividadeItem from './AtividadeItem';

const AtividadeLista: React.FC<AtividadeListaProps> = ({
  atividades,
  editarAtividade,
  handleConfirmarModalExcluir,
}: AtividadeListaProps) => {
  return (
    <>
      <div className="mt-3">
        {atividades.map((ativ) => (
          <AtividadeItem
            key={ativ.id}
            ativ={ativ}
            editarAtividade={editarAtividade}
            handleConfirmarModalExcluir={handleConfirmarModalExcluir}
          />
        ))}
      </div>
    </>
  );
};

export default AtividadeLista;
