using Microsoft.AspNetCore.Identity;
using YLists.BL.ViewModels;

namespace YLists.BL.Contracts
{
    public interface IAccountService
    {
        Guid GetCurrentUserId();

        Task<IdentityUser<Guid>> GetCurrentUserAsync();

        Task<IdentityUserViewModel> GetCurrentUserViewModelAsync();

        Task<IdentityUserViewModel> UserSignInAsync(string login, string password, bool rememberMe);

        Task UserSignOutAsync();

        Task UserSignUpAsync(string login, string email, string password, string passwordConfirm);
    }
}
