using System.Linq.Expressions;
using YLists.BL.Extensions;

namespace YLists.BL.Queries.Base
{
    public abstract class SortedQuery<TEntity> : IQuery<TEntity>
    {
        public SortExpression[] SortExpressions { get; set; }

        public virtual IQueryable<TEntity> ApplyQuery(IQueryable<TEntity> query)
        {
            return ApplySorting(query);
        }

        public IQueryable<TEntity> ApplySorting(IQueryable<TEntity> query)
        {
            if (SortExpressions == null || SortExpressions.Length == 0)
                return query;

            var firstSortExpression = SortExpressions.First();
            var property = GetPropertyExpression(firstSortExpression.SortByProperty);

            IOrderedQueryable<TEntity> orderedQuery = query.OrderBy(property, firstSortExpression.Direction);

            foreach (var sortExpression in SortExpressions.Skip(1))
            {
                property = GetPropertyExpression(sortExpression.SortByProperty);

                orderedQuery = orderedQuery.ThenBy(property, firstSortExpression.Direction);
            }

            return orderedQuery;
        }

        private Expression<Func<TEntity, object>> GetPropertyExpression(string propertyName)
        {
            ParameterExpression parameterExpression = Expression.Parameter(typeof(TEntity), "e");
            var propertyExpression = Expression.Property(parameterExpression, propertyName);
            var converted = Expression.TypeAs(propertyExpression, typeof(object));
            var lambda = Expression.Lambda<Func<TEntity, object>>(converted, new ParameterExpression[] { parameterExpression });

            return lambda;
        }
    }

    public class SortExpression
    {
        private string _sortByProperty;

        public string SortByProperty
        {
            get => !string.IsNullOrEmpty(_sortByProperty) && !char.IsUpper(_sortByProperty[0]) ?
                char.ToUpper(_sortByProperty[0]) + _sortByProperty.Substring(1) :
                _sortByProperty;
            set => _sortByProperty = value;
        }

        public SortDirection Direction { get; set; }
    }

    public enum SortDirection
    {
        Ascending,
        Descending
    }
}
