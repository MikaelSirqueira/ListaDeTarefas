using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProAtividade.Domain.Entities;
using ProAtividade.Domain.Interfaces.Repositories;
using ProAtividade.Domain.Interfaces.Services;

namespace ProAtividade.Domain.Services
{
    public class AtividadeService : IAtividadeService
    {
        private readonly IAtividadeRepo _atividadeRepo;

        public AtividadeService(IAtividadeRepo atividadeRepo)
        {
            this._atividadeRepo = atividadeRepo;
        }

        public async Task<Atividade> AdicionarAtividade(Atividade model)
        {
            if(await _atividadeRepo.RetornarAtividadeTitulo(model.Titulo) != null){
                throw new Exception("Já existe uma atividade com esse título");
            }

            if (await _atividadeRepo.RetornarAtividadeID(model.Id) == null)
            {
                _atividadeRepo.Adicionar(model);
                if(await _atividadeRepo.SalvarMudancas()){
                    return model;
                }
            }

            return null;
        }

        public async Task<Atividade> AtualizarAtividade(Atividade model)
        {
            if (model.DataConclusao != null)
            {
                throw new Exception("Não se pode alterar atividade já concluída");
            }

            if (await _atividadeRepo.RetornarAtividadeID(model.Id) != null) {
                _atividadeRepo.Atualizar(model);
                if (await _atividadeRepo.SalvarMudancas()){
                    return model;
                }
            }

            return null;
        }

        public async Task<bool> ConcluirAtividade(Atividade model)
        {
            if (model != null) {
                model.Concluir();
                _atividadeRepo.Atualizar<Atividade>(model);
                return await _atividadeRepo.SalvarMudancas();
            }

            return false;
        }

        public async Task<bool> DeletarAtividade(int atividadeID)
        {
            var atividade = await _atividadeRepo.RetornarAtividadeID(atividadeID) ?? throw new Exception("Ativiadade selecionada não existe");

            _atividadeRepo.Deletar(atividade);

            return await _atividadeRepo.SalvarMudancas();
        }

        public async Task<Atividade> RetornarAtividadeID(int atividadeID)
        {
            try
            {
                var atividade = await _atividadeRepo.RetornarAtividadeID(atividadeID);
                if (atividade == null) return null;

                return atividade;
            }
            catch (System.Exception ex)
            {                
                 throw new Exception(ex.Message);
            }
        }

        public async Task<Atividade[]> RetornarAtividades()
        {
            try
            {
                var atividades = await _atividadeRepo.RetornarTodasAtividades();
                if (atividades == null) return null;

                return atividades;
            }
            catch (System.Exception ex)
            {                
                 throw new Exception(ex.Message);
            }
        }
    }
}