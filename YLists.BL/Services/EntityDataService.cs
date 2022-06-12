using AutoMapper;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using OfficeOpenXml.Table;
using YLists.BL.Contracts;
using YLists.BL.ViewModels;
using YLists.DAL;
using YLists.DAL.Enums;
using YLists.DAL.Models;

namespace YLists.BL.Services
{
    public class EntityDataService : DataService<Entity, EntityViewModel>, IEntityDataService
    {
        private readonly IAccountService _accountService;
        private readonly ICategoryDataService _categoryDataService;
        private readonly IEntityTemplateDataService _entityTemplateDataService;

        public EntityDataService(
            ApplicationContext context,
            IAccountService accountService,
            ICategoryDataService categoryDataService,
            IEntityTemplateDataService entityTemplateDataService,
            IMapper mapper) :
            base(context, mapper)
        {
            _accountService = accountService;
            _categoryDataService = categoryDataService;
            _entityTemplateDataService = entityTemplateDataService;
        }

        public override Guid Create(EntityViewModel model)
        {
            var entity = _mapper.Map<Entity>(model);

            _context.Attach(entity);

            entity.Owner = _accountService.GetCurrentUserAsync().Result;

            return base.Create(entity);
        }

        public override IQueryable<Entity> GetQuery()
        {
            var currentUserId = _accountService.GetCurrentUserId();

            return _context.Entities
                .Include(e => e.EntityTemplate)
                    .ThenInclude(et => et.BlocksMetadata)
                    .ThenInclude(bm => bm.FieldsMetadata)
                    .ThenInclude(fm => fm.FieldOptionCollection)
                    .ThenInclude(foc => foc.FieldOptions)
                .Include(e => e.Owner)
                .Include(e => e.EntityFieldValues)
                    .ThenInclude(fv => fv.FieldMetadata)
                .Include(e => e.Categories)
                .Where(e => e.OwnerId == currentUserId);
        }

        public override void Update(EntityViewModel model)
        {
            var entity = Get(model.Id.Value);

            _context.Attach(entity);

            entity = _mapper.Map(model, entity);
            entity.Owner = _accountService.GetCurrentUserAsync().Result;

            base.Update(entity);
        }

        public void ImportEntities(Stream fileStream, Guid templateId, Guid? categoryId = null)
        {
            var currentUserId = _accountService.GetCurrentUserId();

            var template = _entityTemplateDataService.Get(templateId);
            var category = categoryId.HasValue ? _categoryDataService.Get(categoryId.Value) : null;

            var allTemplateFields = template.BlocksMetadata.SelectMany(b => b.FieldsMetadata).ToArray();

            Entity[] entities;

            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            using (ExcelPackage package = new ExcelPackage(fileStream))
            {
                var table = package.Workbook
                    .Worksheets
                    .SelectMany(ws => ws.Tables)
                    .FirstOrDefault(t => t.Name == "ListOfEntities");

                if (table == null)
                    throw new Exception("Table with entities not found");

                var entitiesFieldValues = ProcessEntitiesFile(table, allTemplateFields);

                entities = entitiesFieldValues.Select(entityFieldValues => new Entity() {
                    Name = entityFieldValues.Name,
                    EntityTemplateId = templateId,
                    OwnerId = currentUserId,
                    EntityFieldValues = entityFieldValues.FieldValuesMap
                        .Select(fv => new EntityFieldValue() { Value = fv.Value, FieldMetadataId = fv.Key })
                        .ToList(),
                    Categories = categoryId.HasValue ? new List<Category> { category } : new List<Category> { }
                }).ToArray();
            }

            _context.AddRange(entities);
            _context.SaveChanges();
        }

        private List<ExcelEntityFieldValues> ProcessEntitiesFile(ExcelTable table, IEnumerable<FieldMetadata> fields)
        {
            var convertDateTime = new Func<double, DateTime>(excelDate =>
            {
                if (excelDate < 1)
                    throw new Exception("Excel dates cannot be smaller than 0.");

                var dateOfReference = new DateTime(1900, 1, 1);

                if (excelDate > 60d)
                    excelDate = excelDate - 2;
                else
                    excelDate = excelDate - 1;
                return dateOfReference.AddDays(excelDate);
            });

            var start = table.Address.Start;
            var end = table.Address.End;
            var cells = new List<ExcelRangeBase>();

            for (var r = start.Row; r <= end.Row; r++)
                for (var c = start.Column; c <= end.Column; c++)
                    cells.Add(table.WorkSheet.Cells[r, c]);

            var rows = cells
                .GroupBy(cell => cell.Start.Row)
                .OrderBy(row => row.Key)
                .ToArray();

            var headers = rows
                .First()
                .Select((headerCell, i) => new { Header = headerCell.Value.ToString(), Type = headerCell.Value.GetType(), Index = i })
                .Where(_ => !string.IsNullOrWhiteSpace(_.Header) && (_.Header == nameof(Entity.Name) || fields.Select(f => f.Label).Contains(_.Header)))
                .ToArray();

            var values = rows
                .Skip(1)
                .Select(row => row.Select(c => c.Value).ToList());

            fields = fields
                .Where(f => !string.IsNullOrWhiteSpace(f.Label) && headers.Select(h => h.Header).Contains(f.Label))
                .ToArray();

            var entitiesFieldValues = values.Select(valueRow => {
                var fieldValuesMap = fields.Select(field =>
                {
                    var header = headers.First(h => h.Header == field.Label);
                    var value = valueRow[header.Index];

                    return new { Header = header, Field = field, Value = value };
                })
                .Where(_ => !string.IsNullOrWhiteSpace(_.Value.ToString()))
                .ToDictionary(_ => _.Field.Id, _ => ConvertExcelTableValue(_.Header.Type, _.Field.Type, _.Value));

                var nameHeader = headers.First(h => h.Header == nameof(Entity.Name));
                return new ExcelEntityFieldValues() { Name = valueRow[nameHeader.Index].ToString(), FieldValuesMap = fieldValuesMap };
            }).ToList();

            return entitiesFieldValues;
        }

        private string ConvertExcelTableValue(Type cellType, FieldType fieldType, object value)
        {
            if (cellType == typeof(double))
            {
                switch (fieldType)
                {
                    case FieldType.NumericTextBox:
                        return ((double)value).ToString();
                    case FieldType.DatePicker:
                    case FieldType.TimePicker:
                        var unboxedValue = (double)value;
                        unboxedValue -= unboxedValue > 60d ? 2 : 1;

                        return new DateTime(1900, 1, 1)
                            .AddDays(unboxedValue)
                            .ToString();
                    default:
                        return value.ToString();
                }
            }
            else
            {
                return value.ToString();
            }
        }

        private class ExcelEntityFieldValues
        {
            public string Name { get; set; }
            public Dictionary<Guid, string> FieldValuesMap { get; set; }
        }
    }
}
