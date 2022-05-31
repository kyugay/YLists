namespace YLists.Categorization.Client.DTO
{
    public class CategorizeItem
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public float Probability { get; set; }
    }
}
