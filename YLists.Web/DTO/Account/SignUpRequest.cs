namespace YLists.Web.DTO.Account
{
    public class SignUpRequest
    {
        public string Login { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PasswordConfirm { get; set; }
    }
}
