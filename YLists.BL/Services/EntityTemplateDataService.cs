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
    public class EntityTemplateDataService : DataService<EntityTemplate, EntityTemplateViewModel>, IEntityTemplateDataService
    {
        private readonly IAccountService _accountService;
        private readonly IBlockMetadataDataService _blockMetadataDataService;
        private readonly IFieldMetadataDataService _fieldMetadataDataService;

        public EntityTemplateDataService(
            ApplicationContext context,
            IAccountService accountService,
            IBlockMetadataDataService blockMetadataDataService,
            IFieldMetadataDataService fieldMetadataDataService,
            IMapper mapper) :
            base(context, mapper)
        {
            _accountService = accountService;
            _blockMetadataDataService = blockMetadataDataService;
            _fieldMetadataDataService = fieldMetadataDataService;
        }

        public override Guid Create(EntityTemplateViewModel model)
        {
            var template = _mapper.Map<EntityTemplate>(model);
            template.Owner = _accountService.GetCurrentUserAsync().Result;

            return base.Create(template);
        }

        public override IQueryable<EntityTemplate> GetQuery()
        {
            var currentUserId = _accountService.GetCurrentUserId();

            return _context.EntityTemplates
                .Include(et => et.BlocksMetadata)
                    .ThenInclude(bm => bm.FieldsMetadata)
                    .ThenInclude(fm => fm.FieldOptionCollection)
                    .ThenInclude(foc => foc.FieldOptions)
                .Where(et => et.OwnerId == currentUserId);
        }

        public override void Update(EntityTemplateViewModel model)
        {
            var currentUser = _accountService.GetCurrentUserAsync().Result;

            var template = _mapper.Map<EntityTemplate>(model);
            template.Owner = _accountService.GetCurrentUserAsync().Result;

            base.Update(template);

            template.BlocksMetadata.ForEach(block => {
                block.EntityTemplateId = template.Id;
                block.EntityTemplate = template;
            });

            _blockMetadataDataService.Update(template.BlocksMetadata);
            _blockMetadataDataService.Delete((block) =>
                block.EntityTemplateId == template.Id && !template.BlocksMetadata.Select(b => b.Id).Contains(block.Id)
            );


            template.BlocksMetadata.ForEach(block => {
                block.FieldsMetadata.ForEach(field => {
                    field.BlockMetadataId = block.Id;
                    field.BlockMetadata = block;

                    if (field.FieldOptionCollection != null)
                        field.FieldOptionCollection.Owner = currentUser;
                });

                _fieldMetadataDataService.Update(block.FieldsMetadata);
                _fieldMetadataDataService.Delete((field) =>
                    field.BlockMetadataId == block.Id && !block.FieldsMetadata.Select(f => f.Id).Contains(field.Id)
                );
            });
        }

        public void GenerateMultiCreationTemplate(Guid entityTemplateId, Stream output)
        {
            var template = Get(entityTemplateId);

            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            using var package = new ExcelPackage();

            var worksheet = package.Workbook.Worksheets.Add($"List of \"{template.Name}\"");

            int currentColumn = 1;
            var multiSelectAddresses = new List<string>();

            worksheet.Cells[1, currentColumn].Value = nameof(Entity.Name);
            ++currentColumn;

            var fields = template.BlocksMetadata
                .OrderBy(b => b.Order)
                .SelectMany(b => b.FieldsMetadata.OrderBy(f => f.Order))
                .Where(f => !string.IsNullOrEmpty(f.Label));

            foreach (var field in fields)
            {
                var headerCell = worksheet.Cells[1, currentColumn];
                var valueCell = worksheet.Cells[2, currentColumn];

                switch (field.Type)
                {
                    case FieldType.TextBox:
                        headerCell.Value = field.Label;
                        break;

                    case FieldType.TextArea:
                        headerCell.Value = field.Label;
                        break;

                    case FieldType.NumericTextBox:
                        headerCell.Value = field.Label;
                        valueCell.Style.Numberformat.Format = "#,##0.00";
                        break;

                    case FieldType.DatePicker:
                        headerCell.Value = field.Label;
                        valueCell.Style.Numberformat.Format = "dd/mm/yyyy";
                        break;

                    case FieldType.Switch:
                    case FieldType.CompleteSwitch:
                        headerCell.Value = field.Label;

                        var switchCell = worksheet.DataValidations.AddListValidation(valueCell.Address);
                        switchCell.Formula.Values.Add(true.ToString());
                        switchCell.Formula.Values.Add(false.ToString());

                        break;

                    case FieldType.RadioButtons:
                    case FieldType.ComboBox:
                        if (field.FieldOptionCollection?.FieldOptions == null || !field.FieldOptionCollection.FieldOptions.Any())
                            continue;

                        headerCell.Value = field.Label;

                        var comboBoxCell = worksheet.DataValidations.AddListValidation(valueCell.Address);
                        foreach (var option in field.FieldOptionCollection.FieldOptions)
                            comboBoxCell.Formula.Values.Add(option.Value);

                        break;

                    case FieldType.CheckBoxes:
                    case FieldType.MultiSelect:
                        if (field.FieldOptionCollection?.FieldOptions == null || !field.FieldOptionCollection.FieldOptions.Any())
                            continue;

                        headerCell.Value = field.Label;

                        var multiSelectCell = worksheet.DataValidations.AddListValidation(valueCell.Address);
                        foreach (var option in field.FieldOptionCollection.FieldOptions)
                            multiSelectCell.Formula.Values.Add(option.Value);

                        multiSelectAddresses.Add(valueCell.Address);

                        break;

                    default:
                        continue;
                }

                ++currentColumn;
            }

            var columnsCount = currentColumn - 1;
            if (columnsCount != 0)
                worksheet.Tables.Add(worksheet.Cells[1, 1, 2, columnsCount], "ListOfEntities");

            worksheet.Cells.AutoFitColumns();

            /*var multiSelectVBACode = "Private Sub Worksheet_Change(ByVal Target As Range)\n" +
                "Dim Oldvalue As String\n" +
                "Dim Newvalue As String\n" +
                "Application.EnableEvents = True" +
                "On Error GoTo Exitsub\n" +
                "If {0} Then\n" +
                    "If Target.SpecialCells(xlCellTypeAllValidation) Is Nothing Then\n" +
                        "GoTo Exitsub\n" +
                    "Else:\n" +
                        "If Target.Value = \"\" Then GoTo Exitsub Else\n" +
                            "Application.EnableEvents = False\n" +
                            "Newvalue = Target.Value\n" +
                            "Application.Undo\n" +
                            "Oldvalue = Target.Value\n" +
                            "If Oldvalue = \"\" Then\n" +
                                "Target.Value = Newvalue\n" +
                            "Else If InStr(1, Oldvalue, Newvalue) = 0 Then\n" +
                                "Target.Value = Oldvalue & \";\" & Newvalue\n" +
                            "Else:\n" +
                                "Target.Value = Oldvalue\n" +
                            "End If\n" +
                        "End If\n" +
                    "End If\n" +
                "End If\n" +
                "Application.EnableEvents = True\n" +
                "Exitsub:\n" +
                    "Application.EnableEvents = True\n" +
            "End Sub\n";

            if (multiSelectAddresses.Any())
            {
                var addressesCondition = string.Join(" Or ", multiSelectAddresses.Select(address => $"Target.Address = \"{ address }\""));
                var code = string.Format(multiSelectVBACode, addressesCondition);

                package.Workbook.CreateVBAProject();
                worksheet.CodeModule.Code = code;
            }*/

            package.SaveAs(output);
        }
    }
}
