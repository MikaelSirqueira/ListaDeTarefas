import { useState } from 'react';
import TitlePage from '../../components/TitlePage';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const clientes = [
  {
    id: 1,
    nome: 'microsoft',
    responsavel: 'Otto',
    contato: '3221',
    situacao: 'Ativo',
  },
  {
    id: 2,
    nome: 'amazon',
    responsavel: 'jeff',
    contato: '7788',
    situacao: 'Desativado',
  },
  {
    id: 3,
    nome: 'google',
    responsavel: 'besos',
    contato: '6666',
    situacao: 'Em análise',
  },
  {
    id: 4,
    nome: 'facebook',
    responsavel: 'zack',
    contato: '3333',
    situacao: 'Ativo',
  },
  {
    id: 5,
    nome: 'twiiter',
    responsavel: 'jack',
    contato: '2211',
    situacao: 'Ativo',
  },
];

const ClienteLista: React.FC = () => {
  const navigate = useNavigate();
  const [termoBusca, setTermoBusca] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermoBusca(e.target.value);
  };

  const clientesFiltrados = clientes.filter((cliente) => {
    return Object.values(cliente)
      .join(' ')
      .toLowerCase()
      .includes(termoBusca.toLocaleLowerCase());
  });

  const novoCliente = () => {
    navigate('/cliente/detalhe');
  };

  return (
    <>
      <TitlePage title="Cliente Lista">
        <Button variant="outline-secondary" onClick={novoCliente}>
          <i className="fas fa-plus me-2"></i>
          Novo Cliente
        </Button>
      </TitlePage>
      <InputGroup className="mb-3 mt-3">
        <InputGroup.Text>Buscar:</InputGroup.Text>
        <FormControl
          onChange={handleInputChange}
          placeholder="Buscar por nome do cliente"
        ></FormControl>
      </InputGroup>
      <table className="table table-striped table-hover">
        <thead className="table-dark mt-3">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">Responsável</th>
            <th scope="col">Contato</th>
            <th scope="col">Situação</th>
            <th scope="col">Opções</th>
          </tr>
        </thead>
        <tbody>
          {clientesFiltrados.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nome}</td>
              <td>{cliente.responsavel}</td>
              <td>{cliente.contato}</td>
              <td>{cliente.situacao}</td>
              <td>
                <div>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => navigate(`/cliente/detalhe/${cliente.id}`)}
                  >
                    <i className="fas fa-user-edit me-2"></i>
                    Editar
                  </button>
                  <button className="btn btn-sm btn-outline-danger me-2">
                    <i className="fas fa-user-times me-2"></i>
                    Desativar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ClienteLista;
