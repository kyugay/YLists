using Microsoft.AspNetCore.Mvc;
using YLists.BL.Contracts;
using YLists.BL.ViewModels;
using YLists.Web.DTO.Account;

namespace YLists.Web.Controllers
{
    [ApiController]
    [Route("api/Account")]
    public class AccountController : Controller
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpGet]
        [Route("GetCurrentUser")]
        public async Task<IdentityUserViewModel> GetCurrentUser()
        {
            return await _accountService.GetCurrentUserViewModelAsync();
        }

        [HttpPost]
        [Route("SignIn")]
        public async Task<IdentityUserViewModel> UserSignIn([FromBody] SignInRequest request)
        {
            return await _accountService.UserSignInAsync(request.Login, request.Password, request.RememberMe);
        }

        [HttpPost]
        [Route("SignOut")]
        public async Task UserSignOut()
        {
            await _accountService.UserSignOutAsync();
        }


        [HttpPost]
        [Route("SignUp")]
        public async Task UserSignUp([FromBody] SignUpRequest request)
        {
            await _accountService.UserSignUpAsync(request.Login, request.Email, request.Password, request.PasswordConfirm);
        }
    }
}
