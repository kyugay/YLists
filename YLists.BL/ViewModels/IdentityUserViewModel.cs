namespace YLists.BL.ViewModels
{
    public class IdentityUserViewModel<TKey> where TKey : IEquatable<TKey>
    {
        public TKey? Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public bool EmailConfirmed { get; set; }
        public string Token { get; set; }
    }

    public class IdentityUserViewModel : IdentityUserViewModel<Guid> { }
}
