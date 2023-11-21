using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProAtividade.Data.Context;
using ProAtividade.Domain.Entities;
using ProAtividade.Domain.Interfaces.Repositories;

namespace ProAtividade.Data.Repositories
{
    public class AtividadeRepo : GeneralRepo, IAtividadeRepo
    {
        private readonly DataContext _context;
        public AtividadeRepo(DataContext context) : base(context)
        {
            this._context = context;            
        }
        public async Task<Atividade> RetornarAtividadeID(int id)
        {
            IQueryable<Atividade> query = _context.Atividades;
            var queryReturn = 
                await query.
                    AsNoTracking().
                    FirstOrDefaultAsync(a => a.Id == id);

            return queryReturn;
        }

        public async Task<Atividade> RetornarAtividadeTitulo(string titulo)
        {
            IQueryable<Atividade> query = _context.Atividades;
            var queryReturn = 
                await query.
                    AsNoTracking().
                    FirstOrDefaultAsync(a => a.Titulo == titulo);

            return queryReturn;
        }

        public async Task<Atividade[]> RetornarTodasAtividades()
        {
            IQueryable<Atividade> query = _context.Atividades;
            var queryReturn = 
                await query.
                    AsNoTracking().
                    OrderBy(ativ => ativ.Id).
                    ToArrayAsync();

            return queryReturn;
        }
    }
}