using System.Linq.Expressions;
using YLists.BL.Queries.Base;

namespace YLists.BL.Extensions
{
    public static class QueryableExtensions
    {
        public static IOrderedQueryable<TSource> OrderBy<TSource, TKey>(this IQueryable<TSource> source, Expression<Func<TSource, TKey>> keySelector, SortDirection direction)
        {
            return direction == SortDirection.Ascending ?
                source.OrderBy(keySelector) :
                source.OrderByDescending(keySelector);
        }

        public static IOrderedQueryable<TSource> ThenBy<TSource, TKey>(this IOrderedQueryable<TSource> source, Expression<Func<TSource, TKey>> keySelector, SortDirection direction)
        {
            return direction == SortDirection.Ascending ?
                source.ThenBy(keySelector) :
                source.ThenByDescending(keySelector);
        }
    }
}
