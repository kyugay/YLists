namespace YLists.BL.Queries.Base
{
    public interface IQuery<TEntity>
    {
        public IQueryable<TEntity> ApplyQuery(IQueryable<TEntity> query);
    }
}
