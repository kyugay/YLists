using System.ComponentModel;
using System.Linq.Expressions;

namespace YLists.BL.Queries.Base
{
    public abstract class FilteredSortedQuery<TEntity> : SortedQuery<TEntity>
    {
        public FilterExpression[] FilterExpressions { get; set; }

        public override IQueryable<TEntity> ApplyQuery(IQueryable<TEntity> query)
        {
            query = base.ApplyQuery(query);

            return ApplyFilters(query);
        }

        public IQueryable<TEntity> ApplyFilters(IQueryable<TEntity> query)
        {
            if (FilterExpressions == null || FilterExpressions.Length == 0)
                return query;

            foreach(var expression in FilterExpressions)
            {
                ParameterExpression parameterExpression = Expression.Parameter(typeof(TEntity), "e");
                var queryExpression = FilterExpressionToExpression(parameterExpression, expression);

                MethodCallExpression whereCallExpression = Expression.Call(
                    typeof(Queryable),
                    "Where",
                    new Type[] { query.ElementType },
                    query.Expression,
                    Expression.Lambda<Func<TEntity, bool>>(queryExpression, new ParameterExpression[] { parameterExpression }));

                query = query.Provider.CreateQuery<TEntity>(whereCallExpression);
            }

            return query;
        }

        public Expression FilterExpressionToExpression(ParameterExpression parameterExpression, FilterExpression filterExpression)
        {
            MemberExpression memberExpression = Expression.Property(parameterExpression, filterExpression.PropertyName);

            Expression composedExpression;

            var constraintExpressions = filterExpression.Constraints.Select(constraint =>
            {
                switch (filterExpression.DataType)
                {
                    case DataType.Boolean:
                        return BooleanContstraintToExpression(memberExpression, constraint);
                    case DataType.Text:
                        return TextContstraintToExpression(memberExpression, constraint);
                    case DataType.Numeric:
                        return NumericConstraintToExpression(memberExpression, constraint);
                    case DataType.Date:
                        return DateConstraintToExpression(memberExpression, constraint);
                    default:
                        throw new Exception($"Unknown data type #{filterExpression.DataType}");
                }
            });
            composedExpression = ComposeExpressions(filterExpression.ConstraintsBehavior, constraintExpressions);

            return composedExpression;
        }

        public Expression BooleanContstraintToExpression(MemberExpression memberExpression, FilterConstraint constraint)
        {
            var value = bool.Parse(constraint.Value);
            Expression valueExpression = Expression.Constant(value);

            switch (constraint.ConstraintType)
            {
                case ConstraintType.Equals:
                    return Expression.Equal(memberExpression, valueExpression);
                case ConstraintType.NotEquals:
                    return Expression.NotEqual(memberExpression, valueExpression);
                default:
                    throw new Exception($"Constraint of type {constraint.ConstraintType} cannot be applied to boolean data type");
            }
        }

        public Expression TextContstraintToExpression(MemberExpression memberExpression, FilterConstraint constraint)
        {
            var value = constraint.Value?.ToLower();
            Expression valueExpression = Expression.Constant(value);

            Expression converted = Expression.Call(memberExpression, typeof(object).GetMethod("ToString", Type.EmptyTypes));
            Expression memberExpressionLower = Expression.Call(converted, typeof(string).GetMethod("ToLower", Type.EmptyTypes));

            switch (constraint.ConstraintType)
            {
                case ConstraintType.Equals:
                    return Expression.Equal(memberExpressionLower, valueExpression);
                case ConstraintType.NotEquals:
                    return Expression.NotEqual(memberExpressionLower, valueExpression);
                case ConstraintType.StartsWith:
                    return Expression.Call(memberExpression, typeof(string).GetMethod("StartsWith", new Type[] { typeof(string) }), valueExpression);
                case ConstraintType.EndsWith:
                    return Expression.Call(memberExpression, typeof(string).GetMethod("EndsWith", new Type[] { typeof(string) }), valueExpression);
                default:
                    break;
            }

            Expression containsExpression = Expression.Call(memberExpressionLower, typeof(string).GetMethod("Contains", new Type[] { typeof(string) }), valueExpression);

            switch (constraint.ConstraintType)
            {
                case ConstraintType.Contains:
                    return containsExpression;
                case ConstraintType.NotContains:
                    return Expression.Not(containsExpression);
                default:
                    throw new Exception($"Constraint of type {constraint.ConstraintType} cannot be applied to text data type");
            }
        }

        public Expression NumericConstraintToExpression(MemberExpression memberExpression, FilterConstraint constraint)
        {
            var value = double.Parse(constraint.Value);
            Expression right = Expression.Constant(Convert.ChangeType(value, memberExpression.Type), memberExpression.Type);

            switch (constraint.ConstraintType)
            {
                case ConstraintType.Equals:
                    return Expression.Equal(memberExpression, right);
                case ConstraintType.NotEquals:
                    return Expression.NotEqual(memberExpression, right);
                case ConstraintType.LessThan:
                    return Expression.LessThan(memberExpression, right);
                case ConstraintType.LessThenOrEqualTo:
                    return Expression.LessThanOrEqual(memberExpression, right);
                case ConstraintType.GreaterThan:
                    return Expression.GreaterThan(memberExpression, right);
                case ConstraintType.GreaterThenOrEqualTo:
                    return Expression.GreaterThanOrEqual(memberExpression, right);
                default:
                    throw new Exception($"Constraint of type {constraint.ConstraintType} cannot be applied to numeric data type");
            }
        }

        public Expression DateConstraintToExpression(MemberExpression memberExpression, FilterConstraint constraint)
        {
            Expression valueExpression;

            var converter = TypeDescriptor.GetConverter(memberExpression.Type);
            var value = converter.ConvertFrom(constraint.Value);
            valueExpression = Expression.Constant(value, memberExpression.Type);

            switch (constraint.ConstraintType)
            {
                case ConstraintType.Is:
                    return Expression.Equal(memberExpression, valueExpression);
                case ConstraintType.IsNot:
                    return Expression.NotEqual(memberExpression, valueExpression);
                case ConstraintType.Before:
                    return Expression.LessThan(memberExpression, valueExpression);
                case ConstraintType.After:
                    return Expression.GreaterThan(memberExpression, valueExpression);
                default:
                    throw new Exception($"Constraint of type {constraint.ConstraintType} cannot be applied to date data type");
            }
        }

        public Expression ComposeExpressions(ConstraintsBehavior constraintsBehavior, IEnumerable<Expression> expressions)
        {
            Expression composedExpression = expressions.First();

            foreach (var expression in expressions.Skip(1))
            {
                switch (constraintsBehavior)
                {
                    case ConstraintsBehavior.All:
                        composedExpression = Expression.And(composedExpression, expression);
                        break;
                    case ConstraintsBehavior.Any:
                        composedExpression = Expression.Or(composedExpression, expression);
                        break;
                }
            }

            return composedExpression;
        }
    }

    public class FilterExpression
    {
        public FilterConstraint[] Constraints { get; set; }

        private string _propertyName;

        public string PropertyName
        {
            get => !string.IsNullOrEmpty(_propertyName) && !char.IsUpper(_propertyName[0]) ?
                    char.ToUpper(_propertyName[0]) + _propertyName.Substring(1) :
                    _propertyName;
            set => _propertyName = value;
        }

        public DataType DataType { get; set; }

        public ConstraintsBehavior ConstraintsBehavior { get; set; }
    }

    public enum ConstraintsBehavior
    {
        All,
        Any
    }

    public class FilterConstraint
    {
        public ConstraintType ConstraintType { get; set; }

        public string? Value { get; set; }
    }

    public enum ConstraintType
    {
        // Base
        Equals,
        NotEquals,

        // Text
        StartsWith,
        Contains,
        NotContains,
        EndsWith,

        // Number
        LessThan,
        LessThenOrEqualTo,
        GreaterThan,
        GreaterThenOrEqualTo,

        // Date
        Is,
        IsNot,
        Before,
        After,
    }

    public enum DataType
    {
        Text,
        Numeric,
        Boolean,
        Date
    }
}
