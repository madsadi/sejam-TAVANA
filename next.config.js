/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    idpApi: 'https://cluster.tech1a.co/api/account/',
    sejamApi: 'http://cluster.tech1a.co:9072/api/request/',
    captchaApi: 'https://cluster.tech1a.co:8543/api/'
  },
}

module.exports = nextConfig
