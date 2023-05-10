/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    idpApi: 'https://idp.tavanabroker.ir/api/',
    sejamApi: 'https://sejam-gateway.tavanabroker.ir/api/request/',
    fileServerApi: 'https://file-manager.tavanabroker.ir/api/file-manager/',
    captchaApi: 'https://captcha.tavanabroker.ir/api/'

  },
}

module.exports = nextConfig
