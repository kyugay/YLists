using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using YLists.BL.Contracts;
using YLists.BL.Queries.Base;
using YLists.DAL;
using YLists.DAL.Models;

namespace YLists.BL.Services
{
    public abstract class DataService<TEntity, TModel> : IDataService<TEntity, TModel>
        where TEntity : BaseEntity
        where TModel : class
    {
        protected readonly ApplicationContext _context;
        protected readonly IMapper _mapper;

        public DataService(
            ApplicationContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        #region Create

        public virtual Guid[] Create(IEnumerable<TEntity> entities)
        {
            _context.AddRange(entities);
            _context.SaveChanges();

            return entities.Select(e => e.Id).ToArray();
        }

        public virtual Guid Create(TEntity entity)
        {
            _context.Add(entity);
            _context.SaveChanges();

            return entity.Id;
        }

        public virtual Guid[] Create(IEnumerable<TModel> models)
        {
            var entities = _mapper.Map<IEnumerable<TEntity>>(models);

            return Create(entities);
        }

        public virtual Guid Create(TModel model)
        {
            var entity = _mapper.Map<TEntity>(model);

            return Create(entity);
        }

        #endregion

        #region Read

        public virtual IQueryable<TEntity> GetQuery()
        {
            return _context.Set<TEntity>();
        }

        public virtual IQueryable<TEntity> GetAll()
        {
            return GetQuery().AsNoTracking();
        }

        public virtual TModel[] GetAllViewModels()
        {
            var entities = GetAll();

            var entitiesArr = entities.ToArray();
            var res = _mapper.ProjectTo<TModel>(entities).ToArray();

            return res;
        }

        public TModel[] GetAllViewModels(FilteredSortedQuery<TEntity> query)
        {
            var entities = GetAll();

            entities = query.ApplyQuery(entities);

            return _mapper.ProjectTo<TModel>(entities).ToArray();
        }

        public virtual TEntity Get(Guid id)
        {
            return GetQuery().FirstOrDefault(e => e.Id == id);
        }

        public virtual TModel GetViewModel(Guid id)
        {
            var entity = Get(id);

            return _mapper.Map<TModel>(entity);
        }

        #endregion

        #region Update

        public virtual void Update(IEnumerable<TEntity> entities)
        {
            _context.UpdateRange(entities);
            _context.SaveChanges();
        }

        public virtual void Update(TEntity entity)
        {
            _context.Update(entity);
            _context.SaveChanges();
        }

        public virtual void Update(IEnumerable<TModel> models)
        {
            var entities = _mapper.Map<IEnumerable<TEntity>>(models);

            Update(entities);
        }

        public virtual void Update(TModel model)
        {
            var entity = _mapper.Map<TEntity>(model);

            Update(entity);
        }

        #endregion

        #region Delete

        public virtual void Delete(Expression<Func<TEntity, bool>> predicate)
        {
            var entities = GetQuery().Where(predicate);

            _context.Set<TEntity>().RemoveRange(entities);
            _context.SaveChanges();
        }

        public virtual void Delete(IEnumerable<Guid> ids)
        {
            var entities = GetQuery().Where(e => ids.Contains(e.Id));

            _context.Set<TEntity>().RemoveRange(entities);
            _context.SaveChanges();
        }

        public virtual void Delete(Guid id)
        {
            var entity = Get(id);

            _context.Set<TEntity>().Remove(entity);
            _context.SaveChanges();
        }

        #endregion
    }
}
