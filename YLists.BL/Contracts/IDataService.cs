using System.Linq.Expressions;
using YLists.BL.Queries.Base;

namespace YLists.BL.Contracts
{
    public interface IDataService<TEntity, TModel>
    {
        Guid[] Create(IEnumerable<TEntity> entities);
        Guid Create(TEntity entity);
        Guid[] Create(IEnumerable<TModel> models);
        Guid Create(TModel model);

        IQueryable<TEntity> GetQuery();

        IQueryable<TEntity> GetAll();
        TModel[] GetAllViewModels();
        TModel[] GetAllViewModels(FilteredSortedQuery<TEntity> query);
        TEntity Get(Guid id);
        TModel GetViewModel(Guid id);

        void Update(IEnumerable<TEntity> entities);
        void Update(TEntity entity);
        void Update(IEnumerable<TModel> models);
        void Update(TModel model);

        void Delete(Expression<Func<TEntity, bool>> predicate);
        void Delete(IEnumerable<Guid> ids);
        void Delete(Guid id);
    }
}
