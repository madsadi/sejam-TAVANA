/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    idpApi: 'https://cluster.tech1a.co/api/',
    sejamApi: 'http://cluster.tech1a.co:9072/api/request/',
    fileServerApi: 'http://cluster.tech1a.co:9073/api/file-manager/',
    captchaApi: 'https://cluster.tech1a.co:8543/api/'
  },
}

module.exports = nextConfig
