/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    idpApi: 'https://cluster.tech1a.co/api/',
    sejamApi: 'http://172.24.65.20:9072/api/request/',
    fileServerApi: 'http://172.24.65.20:9073/api/file-manager/',
    captchaApi: 'https://cluster.tech1a.co:8543/api/'
  },
}

module.exports = nextConfig
