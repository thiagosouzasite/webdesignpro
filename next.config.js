/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Especifique o hostname explicitamente:
  serverOptions: {
    hostname: '0.0.0.0',
    port: 3000
  }
}

module.exports = nextConfig 