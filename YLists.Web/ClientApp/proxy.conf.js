const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:25756';

const PROXY_CONFIG = [
  {
    context: [
      "/api/Account",
      "/api/BlockMetadata",
      "/api/Category",
      "/api/Entity",
      "/api/EntityFieldValue",
      "/api/EntityTemplate",
      "/api/FieldMetadata",
      "/api/FieldOptionCollection",
      "/api/FieldOption",
      "/api/Model",

      "/swagger"
   ],
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  }
]

module.exports = PROXY_CONFIG;
