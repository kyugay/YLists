using TinyCsvParser.Mapping;
using YLists.Categorization.Client.DTO;

namespace YLists.Web.CsvMapping
{
    public class CsvModelMapping : CsvMapping<TrainingItem>
    {
        public CsvModelMapping() : base()
        {
            MapProperty(0, ti => ti.Name);
            MapProperty(1, ti => ti.Category);
        }
    }
}
