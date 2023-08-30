/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  publicRuntimeConfig: {
    app: {
      IdpEndPoint: process.env.IdpEndPoint,
      SejamGatewayEndPoint: process.env.SejamGatewayEndPoint,
      FileManagerEndPoint: process.env.FileManagerEndPoint,
      CaptchaEndPoint: process.env.CaptchaEndPoint
    }
  }
}

module.exports = nextConfig
