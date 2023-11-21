using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProAtividade.Data.Context;
using ProAtividade.Domain.Interfaces.Repositories;

namespace ProAtividade.Data.Repositories
{
    public class GeneralRepo : IGeneralRepo
    {
        private readonly DataContext _context;
        public GeneralRepo(DataContext context)
        {
            this._context = context;            
        }

        public void Adicionar<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Atualizar<T>(T entity) where T : class
        {
            _context.Update(entity);
        }

        public void Deletar<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public void DeletarLista<T>(T[] entityList) where T : class
        {
            _context.RemoveRange(entityList);
        }

        public async Task<bool> SalvarMudancas()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }
    }
}