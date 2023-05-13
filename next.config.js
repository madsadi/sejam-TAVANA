/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  publicRuntimeConfig: {
    app: {
      IDP_URL: process.env.IDP_URL,
      SEJAM_URL: process.env.SEJAM_URL,
      FILE_SERVER_URL: process.env.FILE_SERVER_URL,
      CAPTCHA_URL: process.env.CAPTCHA_URL
    }
  }
}

module.exports = nextConfig
