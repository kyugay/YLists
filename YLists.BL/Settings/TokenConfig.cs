using System;

namespace YLists.BL.Settings
{
    public class TokenConfig
    {
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public Guid Key { get; set; }
    }
}
