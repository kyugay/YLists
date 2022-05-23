using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using YLists.BL.Contracts;
using YLists.BL.Settings;
using YLists.BL.ViewModels;
using YLists.DAL;

namespace YLists.BL.Services
{
    public class AccountService : IAccountService
    {
        private readonly ApplicationContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IMapper _mapper;
        private readonly TokenConfig _tokenConfig;
        private readonly SignInManager<IdentityUser<Guid>> _signInManager;
        private readonly UserManager<IdentityUser<Guid>> _userManager;

        public AccountService(
            ApplicationContext context,
            IHttpContextAccessor httpContextAccessor,
            IMapper mapper,
            IOptions<YListSettings> config,
            SignInManager<IdentityUser<Guid>> signInManager,
            UserManager<IdentityUser<Guid>> userManager)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
            _mapper = mapper;
            _tokenConfig = config.Value.TokenConfig;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        public Guid GetCurrentUserId()
        {
            var claim = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier);

            _ = Guid.TryParse(claim?.Value, out var id);

            return id;
        }

        public async Task<IdentityUser<Guid>> GetCurrentUserAsync()
        {
            var curentUser = await _userManager.GetUserAsync(_httpContextAccessor.HttpContext.User);

            return curentUser;
        }

        public async Task<IdentityUserViewModel> GetCurrentUserViewModelAsync()
        {
            var user = await GetCurrentUserAsync();

            return _mapper.Map<IdentityUserViewModel>(user);
        }

        public async Task<IdentityUserViewModel> UserSignInAsync(string login, string password, bool rememberMe)
        {
            if (string.IsNullOrEmpty(login) ||
                string.IsNullOrEmpty(password))
            {
                throw new Exception("Incorrect username or password");
            }

            await UserSignOutAsync();

            var result = await _signInManager.PasswordSignInAsync(login, password, rememberMe, false);

            if (!result.Succeeded)
            {
                throw new Exception("Incorrect username or password");
            }

            var user = await _userManager.FindByNameAsync(login);
            var userViewModel = _mapper.Map<IdentityUserViewModel>(user);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, login),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken
            (
                issuer: _tokenConfig.Issuer,
                audience: _tokenConfig.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddDays(2038),
                notBefore: DateTime.UtcNow,
                signingCredentials: new SigningCredentials(
                    new SymmetricSecurityKey(_tokenConfig.Key.ToByteArray()),
                    SecurityAlgorithms.HmacSha256)
            );

            userViewModel.Token = new JwtSecurityTokenHandler().WriteToken(token);

            return userViewModel;
        }

        public async Task UserSignOutAsync()
        {
            await _signInManager.SignOutAsync();
        }

        public async Task UserSignUpAsync(string login, string email, string password, string passwordConfirm)
        {
            if (string.IsNullOrEmpty(login) ||
                string.IsNullOrEmpty(email) ||
                string.IsNullOrEmpty(password) ||
                string.IsNullOrEmpty(passwordConfirm))
            {
                throw new Exception("Incorrect username, email or password");
            }

            if (password != passwordConfirm)
            {
                throw new Exception("Passwords do not match");
            }

            var user = new IdentityUser<Guid> { Email = email, UserName = login };

            var result = await _userManager.CreateAsync(user, password);

            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(e => e.Description);

                throw new Exception(string.Join("\n", errors));
            }
        }
    }
}
