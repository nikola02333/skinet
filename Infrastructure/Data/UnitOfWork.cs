using System;
using System.Collections;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;

namespace Infrastructure.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly StoreContext _storeContext;
        private Hashtable _repositories;
        public UnitOfWork(StoreContext storeContext)
        {
            _storeContext = storeContext;

        }
        public async Task<int> Complete()
        {
            return await _storeContext.SaveChangesAsync();
        }

        public void Dispose()
        {
            _storeContext.Dispose();
        }

        public IGenericRerpository<TEntity> Rerpository<TEntity>() where TEntity : BaseEntity
        {
            if (_repositories == null)
            {
                _repositories = new Hashtable();
            }
            var type = typeof(TEntity).Name;

            if (!_repositories.ContainsKey(type))
            {
                var repositoryType = typeof(GenericRepository<>);
                var repositoryInstance = Activator.CreateInstance(repositoryType.MakeGenericType
                                                                    (typeof(TEntity)), _storeContext);

                _repositories.Add(type, repositoryInstance);
            }

            return (IGenericRerpository<TEntity>)_repositories[type];
        }

    }
}